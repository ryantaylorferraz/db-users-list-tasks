import { Exclude } from "class-transformer";
import { BaseEntity } from "src/utils/base.entity";

export class UserEntity extends BaseEntity {
    public readonly id: string;
    public firstName: string;
    public email: string;
    public lastName: string;
    public createdAt: Date;
    public updatedAt: Date;

    @Exclude()
    public password: string;
}
