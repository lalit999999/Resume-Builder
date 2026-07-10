import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import config from "../templates/nitp/config.json" with { type: "json" }

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const shared = {
    name: config.name,
    texPath: `templates/${config.id}/template.tex.njk`,
    configPath: `templates/${config.id}/config.json`,
    description: config.description,
    category: config.category,
    tags: config.tags,
    thumbnailColor: config.thumbnailColor,
    popular: config.popular,
  }

  await prisma.template.upsert({
    where: { id: config.id },
    create: { id: config.id, ...shared },
    update: shared,
  })
  console.log(`Seeded template: ${config.id}`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
