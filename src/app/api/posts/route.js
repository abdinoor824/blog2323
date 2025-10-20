import {prisma} from "@/utils/connect"
import { NextResponse } from "next/server"
import { getAuthSession } from "@/utils/auth";
export const GET = async (req) =>{
    const {searchParams} = new URL(req.url)


    const page= searchParams.get("page")
     const cat= searchParams.get("cat")




    const POST_PER_PAGE =2;
    const query = {
        take:POST_PER_PAGE,
        skip: POST_PER_PAGE *(page - 1),
        where:{
            ...(cat && {catSlug : cat})
        }
    }

    try {
      const [posts, count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({ where: query.where }),
      ]);

      // Normalize posts so the frontend can read `image` (map from existing `img` field)
      const normalized = posts.map((p) => ({ ...p, image: p.img ?? p.image ?? null }));

      return NextResponse.json({ posts: normalized, count }, { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(JSON.stringify({ message: "something went wrong.." }), { status: 500 });
    }
}








export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

    try {
      const body = await req.json();
      console.log("[POST /api/posts] received body:", body);

      // normalize image field name (client may send `image` or `img`)
      const imageField = body.img ?? body.image ?? null;

      // ✅ Generate slug (unique and clean)
      const slug =
        body.title
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") +
        "-" +
        Math.random().toString(36).substring(2, 7);

      // Persist into existing Prisma field `img` to avoid schema changes/migration now
      const post = await prisma.post.create({
        data: {
          title: body.title,
          desc: body.desc,
          img: imageField,
          catSlug: body.catSlug || "uncategorized",
          userEmail: session.user.email,
          slug: slug, 
        },
      });

     
      const response = { ...post, image: post.img ?? post.image ?? null };

      return NextResponse.json(response, { status: 200 });
    } catch (err) {
      console.error("❌ Error creating post:", err);
      return NextResponse.json({ message: "Something went wrong.." }, { status: 500 });
    }
};
