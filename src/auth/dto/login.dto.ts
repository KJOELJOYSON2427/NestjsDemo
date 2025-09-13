
import { 
  IsEmail, 
  IsNotEmpty, 
 
  MinLength, 
  MaxLength 
} from 'class-validator';

export class RegisterDto {
 

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  password: string;
}
