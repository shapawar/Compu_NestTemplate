import { IsEmail, IsAlphanumeric, IsString, Length, IsNotEmpty } from 'class-validator'

export class UserPostDTO {
     username: string;
     email: string;
     mobile: number;
     password: string;
     address: string;
}

/* import {IsEmail,IsAlphanumeric,IsString,Length, IsNotEmpty} from 'class-validator'

export class UserPostDTO {
     @IsNotEmpty() @IsString() @Length(8,20)  readonly username: string;
     @IsNotEmpty() @IsEmail() readonly email: string;
     @IsNotEmpty() @Length(10,12) readonly mobile: number;
     @IsNotEmpty() @Length(8, 15) readonly password: string;
     @IsNotEmpty()  readonly address: string;
}


 */
