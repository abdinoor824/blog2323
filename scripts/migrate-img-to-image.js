/**
 * Simple migration script to copy legacy `img` -> `image` for posts.
 * Run with: node ./scripts/migrate-img-to-image.js (from project root)
 * Requires that DATABASE_URL is available in the environment.
 */

const { PrismaClient } = require("@prisma/client");

async function main() {
	const prisma = new PrismaClient();
	try {
		const posts = await prisma.post.findMany({ where: { image: null, NOT: { img: null } } });
		console.log(`Found ${posts.length} posts to migrate.`);
		for (const p of posts) {
			console.log(`- Migrating post ${p.id} slug=${p.slug} img=${p.img}`);
			await prisma.post.update({ where: { id: p.id }, data: { image: p.img } });
		}
		console.log("Migration complete.");
	} catch (err) {
		console.error("Migration error:", err);
		process.exitCode = 1;
	} finally {
		await prisma.$disconnect();
	}
}

main();
