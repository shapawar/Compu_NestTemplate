/* 
* Custom imports
*/
import { Injectable } from "@nestjs/common";

// SignUp DTO
@Injectable()
export class UserSignupDTO{
    public fname:string;
    public lname:string;
    public username: string;
    public email:string;
    public mobile:number;
    public gender:string;
    public password:string;
}