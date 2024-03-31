import users from "./users.json" assert { type: 'json' }
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

let emails = new Set();

const main = async () => {
    for (let user of users) {
        if (!emails.has(user.email)) {
            emails.add(user.email);
            try {
                await prisma.user.upsert({
                    where: { email: user.email },
                    update: {},
                    create: user
                });
            } catch (error) {
                throw error;
            }
        }
    }
}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally( async () => {
    await prisma.$disconnect()
})

main()