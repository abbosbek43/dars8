import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/craete.dtao';

@Controller('users')
export class UsersController {
    constructor(private readonly userService :  UsersService){}
    @Post("signUp")
    create(@Body() data:CreateUserDto){
        return this.userService.create(data)
    }                                                          
    @Post("login")
    signIn(@Body() data:LoginDto){
        return this.userService.login(data)
    }
}
