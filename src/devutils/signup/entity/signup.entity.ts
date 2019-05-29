/* 
* NEST & Third party imports
*/
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString, Length, IsEmail } from "class-validator";



/* 
* Signup Entity
*/
@Entity()
export class signup{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsString()
    @Length(2, 20)
    fname:string;

    @Column()
    @IsString()
    @Length(2,20)
    lname:string
     
    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(8 , 15)
    username:string

    @Column("bigint")
    @IsNotEmpty()
    mobile:number

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email:string
    
    @Column()
    @IsNotEmpty()
    @IsString()
    gender:string
    
    @Column()
    password:string

}