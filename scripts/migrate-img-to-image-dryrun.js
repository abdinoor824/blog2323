const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  try {
    const posts = await prisma.post.findMany({ where: { image: null, NOT: { img: null } }, select: { id: true, slug: true, img: true } });
    console.log(`Dry-run: would migrate ${posts.length} posts (image <- img):`);
    for (const p of posts) {
      console.log(`- id=${p.id} slug=${p.slug} img=${p.img}`);
    }
    if (posts.length === 0) console.log('No changes needed.');
  } catch (err) {
    console.error('Dry-run error:', err);
    process.exitCode = 1;
  } finally {
    await require('@prisma/client').PrismaClient.prototype.$disconnect?.();
  }
}

main();
