import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Persona extends BaseEntity {

    @Column({
        nullable: true,
    })
    avatarUrl: string

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({
        nullable: true,
    })
    password: string

    @Column({
        unique: true,
    })
    email: string

    @Column({
        nullable: true,
    })
    phone: string

    @Column({
        nullable: true,
    })
    address: string

    @Column({
        nullable: true,
    })
    gender: string

    @Column({
        nullable: true,
    })
    birth: string

    @Column({
        nullable: true,
    })
    token: string


    // create TABLE person(
    //     id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    //     username VARCHAR(255),
    //     password VARCHAR(255),
    //     email VARCHAR(255) UNIQUE,
    //     phone VARCHAR(255),
    //     address VARCHAR(255),
    //     gender VARCHAR(64),
    //     birth DATE
    // );

}


