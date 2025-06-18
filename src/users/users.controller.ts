import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/craete.dtao';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decaratr';
import { UpdateUserDto } from './dto/update.dto';

@Controller('users')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UsersController {
    constructor(private readonly userService :  UsersService){}
    @Post("signUp")
    @Roles('admin')
    create(@Body() data:CreateUserDto){
        return this.userService.create(data)
    }                                                          
    @Post("login")

    signIn(@Body() data:LoginDto){
        return this.userService.login(data)
    }
    @Get()
    @Roles('admin')
    getall(){
        return this.userService.getall
    }
    @Get('/:id')
    @Roles('admin')
    getone(@Param("id") id :string){
        return this.userService.getOne(parseInt(id))
    }
    @Patch("update/:id")
    @Roles("admin")
    update(@Param("id") id :string,@Body() data:UpdateUserDto){
        return this.userService.update(parseInt(id),data)
    }
    @Delete("delete")
    @Roles("admin")
    deleteuser(@Param("id") id : string){
        return this.userService.deleteUser(parseInt(id))
    }

}
