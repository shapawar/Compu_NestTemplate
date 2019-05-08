/* 
* NEST & Third party middleware
*/
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

/* Define User Entity */
@Entity()
export class userEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  username: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @Length(10, 12)
  mobile: number;

  @Column()
  @IsNotEmpty()
  @Length(8, 15)
  password: string;

  @Column('text')
  @IsNotEmpty()
  address: string;
}