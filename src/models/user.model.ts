import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'firstname'
    })
    firstName: string;

    @Column({
        name: 'lastname'
    })
    lastName: string;

    @Column({
        name: 'isactive',
        default: false,
    })
    isActive: Boolean;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}