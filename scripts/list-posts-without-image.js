const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  try {
    const posts = await prisma.post.findMany({
      where: { image: null },
      select: { id: true, slug: true, title: true, img: true, userEmail: true },
    });
    console.log(`Found ${posts.length} posts with image=null:`);
    for (const p of posts) {
      console.log(`- id=${p.id} slug=${p.slug} title=${p.title} img=${p.img} user=${p.userEmail}`);
    }
  } catch (err) {
    console.error('Error listing posts:', err);
    process.exitCode = 1;
  } finally {
    await require('@prisma/client').PrismaClient.prototype.$disconnect?.();
  }
}

main();
