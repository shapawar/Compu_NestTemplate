import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()

export class userEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  password: string;

  @Column('text')
  address: string;
}