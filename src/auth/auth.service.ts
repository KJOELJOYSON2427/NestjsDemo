import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { RegisterDto } from './dto/register.dto';
import bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { JwtService } from "@nestjs/jwt"
import { JwtPayload } from './types/jwt-payload.interface';
export type RefreshTokenPayload = Pick<JwtPayload, 'sub'>;
  
type Tokens<T> = {
    accessToken: T;
    refreshToken: T;
};


@Injectable()
export class AuthService {
 


async log(){
    const max=await this.hashPassword("123456")
    return max;
}

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {
  this.log().then((result) => {
    console.log(result); // will log the resolved hash
  });
       
    }

    async register(RegisterDto: RegisterDto) {

        const existingUser = await this.userRepository.findOne({
            where: {
                email: RegisterDto.email
            }
        })

        if (existingUser) {
            throw new ConflictException(`Email is already registered with this ${RegisterDto.email}`)

        }

        const hashedPassword = await this.hashPassword(RegisterDto.password);

        const newlyCreatedUser = this.userRepository.create({
            email: RegisterDto.email,
            name: RegisterDto.name,
            //    password:RegisterDto.password
            password: hashedPassword,
            role: UserRole.USER
        })

        const savedUser = await this.userRepository.save(newlyCreatedUser);

        //the saved user dont have aal information

        if (!savedUser) {
            throw new UnauthorizedException("Something went wrong!");
        }

        const { password, ...result } = savedUser;


        return {
            user: result,
            message: "Registration Successfull"
        }

    }

    async registerAdmin(RegisterDto: RegisterDto) {
        const existingUser = await this.userRepository.findOne({
            where: {
                email: RegisterDto.email
            }
        })

        if (existingUser) {
            throw new ConflictException(`Email is already registered with this ${RegisterDto.email}`)

        }
        const hashedPassword = await this.hashPassword(RegisterDto.password);

        const newlyAdmin = this.userRepository.create({
            email: RegisterDto.email,
            name: RegisterDto.name,
            //    password:RegisterDto.password
            password: hashedPassword,
            role: UserRole.ADMIN
        })

        const savedAdmin = await this.userRepository.save(newlyAdmin);

        //the saved user dont have aal information

        if (!savedAdmin) {
            throw new UnauthorizedException("Something went wrong!");
        }

        const { password, ...result } = savedAdmin;
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, saltRounds)
    }


    async signIn(login: LoginDto) {

        const user = await this.userRepository.findOne({
            where: {
                email: login.email
            }


        })

        if (!user) {
            throw new NotFoundException(`Please sign up with the another email `)
        }

        const isMatch = await this.verifyPassword(login.password, user.password);


        if (!isMatch) {
            throw new UnauthorizedException(
                'Please enter the password correctly'
            );
        }
        const tokens = await this.generateTokens(user);
        const { password, ...result } = user

        return {
            user: result,
            ...tokens,
            message: 'Login Successfull'
        }

    }


  





    private async generateTokens(user: User): Promise<Tokens<string>> {
        return {
            accessToken: await this.generateAccessToken(user),
            refreshToken: await this.generateRefreshToken(user),
        };
    }
    // ⚡ Quick Analogy

    // Access token = your movie ticket 🎟️ (valid for a single showtime).

    // Refresh token = your membership card 🪪 (lets you get a new ticket when the old one expires).

    private async generateRefreshToken(user: User): Promise<string> {
        const payload = {
            sub: user.id,         // "subject" (standard claim)
            // optional
        };

        const refreshToken = await this.jwtService.sign(payload,
            { expiresIn: '7d' }, 
        );
        return refreshToken;
    }


    private async generateAccessToken(user: User): Promise<string> {
        const payload = {
            // "subject" (standard claim)
            email: user.email,
            sub:user.id,
            role: user.role,      // optional
        };

        const accessToken = await this.jwtService.sign(payload,
            {
                expiresIn:'1h'
            }
        );
        return accessToken;
    }



    private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

       

    async refreshToken(refreshToken: string){
        try{
              const payload= await this.jwtService.verifyAsync<RefreshTokenPayload>(refreshToken); //global setup


            const user = await this.userRepository.createQueryBuilder("user")
                .where(
                    new Brackets(qb1 => {
                        qb1.where("user.id = :id", { id: payload.sub });
                    }),
                )
                .getOne();

                if(!user){
                    throw new UnauthorizedException(`invalid token`)
                }

                const accessToken =await this.generateAccessToken(user);

                return {
                    accessToken:accessToken,
                    message:"AccessToken Generated"
                }



        }catch(e){
            throw new UnauthorizedException('Invalid token')
        }
    }



    //find the current user
    async getUserById(userId:number){
        console.log("came3");
        
        const user = await this.userRepository.createQueryBuilder("user")
        .where(
            new Brackets(
                qb1 =>qb1.where("user.id = :id",{id: userId})
            )
            
        ).getOne()

        if(!user){
            throw new UnauthorizedException("Invalid User")
        }
        const {password, ...result}=user;
        return result;

    }
}
