import * as bcryptjs from "bcryptjs"

export async function hashPassword(password: string) {
    return bcryptjs.hash(password, 10)
}