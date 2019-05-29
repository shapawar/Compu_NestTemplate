import { Injectable } from "@nestjs/common";

@Injectable()
export class UserSignupDTO{
    public fname:string;
    public lname:string;
    public username: string;
    public email:string;
    public mobile:number;
    public gender:string;
}