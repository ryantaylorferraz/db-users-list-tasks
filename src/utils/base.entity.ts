import { randomUUID } from "crypto"

export class BaseEntity {
    readonly id: string

    constructor() {
        this.id = randomUUID()
    }

}