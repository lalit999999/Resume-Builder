import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import config from "../templates/nitp/config.json" with { type: "json" }

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.template.upsert({
    where: { id: config.id },
    create: {
      id: config.id,
      name: config.name,
      texPath: `templates/${config.id}/template.tex.njk`,
      configPath: `templates/${config.id}/config.json`,
    },
    update: {
      name: config.name,
      texPath: `templates/${config.id}/template.tex.njk`,
      configPath: `templates/${config.id}/config.json`,
    },
  })
  console.log(`Seeded template: ${config.id}`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
