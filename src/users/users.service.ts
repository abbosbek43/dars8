import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginDto } from './dto/craete.dtao';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtSer5vice: JwtService,
  ) {}

  async create(data: CreateUserDto) {
    const result = await this.prisma.user.findUnique({
      where: { username: data.username },
    });
    if (result) throw new ConflictException('user already exists');
    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashed,
      },
    });

    const token = this.jwtSer5vice.sign({ id: user.id, email: user.email , roles:user.role});
    return {
      message: 'User created succesfully',
      acces_token: token,
    };
  }
  async login(data:LoginDto){
    const user = await this.prisma.user.findUnique({
      where: { username: data.username },
    });
    if (!user) throw new NotFoundException('invalid username or password');

    const decode_pass = await bcrypt.compare(data.password,user.password) 
    if(!decode_pass) throw new UnauthorizedException("invalid username or password ")

    const token = this.jwtSer5vice.sign({ id: user.id, email: user.email });
    return {
      message: 'User signed succesfully',
     
      
      acces_token: token,
    };
  }
  async  getall(){
    return await this.prisma.user.findMany()
  }
  async getOne(id:number){
    return await this.prisma.user.findFirst({
      where:{id}
    })
  }
  async update(id: number,data:UpdateUserDto){
    const user = await this.prisma.user.findUnique({where:{id}})
    if(!user) throw new NotFoundException("user not found")
    return await this.prisma.user.update({
      where:{id},
      data
    })
  }
  async deleteUser(id:number){
    const user = await this.prisma.user.findUnique({where:{id}})
    if(!user) throw new NotFoundException("user not found")
    return await this.prisma.user.delete({where:{id}})

    return "user succesfully deleted"
  }



}
