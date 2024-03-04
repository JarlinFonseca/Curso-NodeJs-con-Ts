import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";


@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  jobPosition?: string;

  @Column()
  numberPhone!: number;

  @Column({nullable: true})
  streetAddress?: string;

  @OneToOne(()=>CustomerEntity, (customer)=> customer.user)
  customer!: CustomerEntity;
}