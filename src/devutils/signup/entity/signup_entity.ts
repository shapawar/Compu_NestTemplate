import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString, Length, IsNumber, IsEmail } from "class-validator";



@Entity()

export class signup{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    fname:string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(2,20)
    lname:string
     
    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(8 , 15)
    username:string

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Length(10, 12)
    mobile:number;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email:string
    
    @Column()
    @IsNotEmpty()
    @IsString()
    gender:string


}