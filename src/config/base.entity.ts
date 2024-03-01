import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({
        name: "created_ad",
        type: "timestamp",
    })
    createdAd!: Date;

    @UpdateDateColumn({
        name: "update_ad",
        type: "timestamp",
    })
    updateAd!: Date;

}

//id
//created_ad
//update_ad