import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
  console.log('Starting migration: copy img -> image for posts where image is null')
  const posts = await prisma.post.findMany({ where: { image: null, img: { not: null } }, select: { id: true, img: true } })
  console.log(`Found ${posts.length} posts to update`)
  for(const p of posts){
    await prisma.post.update({ where: { id: p.id }, data: { image: p.img } })
    console.log(`Updated post ${p.id}`)
  }
  console.log('Migration complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
