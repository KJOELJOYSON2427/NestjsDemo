import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { register } from 'module';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private  userRepository: Repository<User>
    ){
    }

    async register(register: RegisterDto){
            const existingUser=await this.userRepository.findOne({
                where:{
                    email:register.email
                }
            })

            if(existingUser){
                throw new ConflictException(`Email is already registered with this ${register.email}`)

            }

            const hashedPassword = await this.hasPassword(register.password);


        }
   private hasPassword(password: string) {
    hrow new Error('Method not implemented.');
    }
}
