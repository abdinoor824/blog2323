import {prisma} from "@/utils/connect"
import { NextResponse } from "next/server"
import { getAuthSession } from "@/utils/auth";
export const GET = async (req) =>{
    // Ensure we have a complete URL by using the request URL as base
    const url = new URL(req.url, process.env.NEXTAUTH_URL || 'http://localhost:3000');
    const searchParams = url.searchParams


    const page = parseInt(searchParams.get("page") || "1", 10);
    // Only use category if it's not empty
    const cat = searchParams.get("cat") || null;
    console.log('[GET /api/posts] Query params:', { page, cat });

    const POST_PER_PAGE = 2;
    const query = {
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where: cat ? { catSlug: cat } : {}
    }

    try
    {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({ where: query.where })
        ]);
        
        // Normalize posts so the frontend can always use `image`
        const normalized = posts.map((p) => ({ ...p, image: p?.image ?? p?.img ?? null }));
        console.log('[GET /api/posts] Returning:', { 
            count, 
            firstPost: normalized[0] ? {
                id: normalized[0].id,
                title: normalized[0].title,
                image: normalized[0].image
            } : null 
        });
        
        return NextResponse.json({ posts: normalized, count }, { status: 200 });

    } catch (err) {
        console.error('[GET /api/posts] Error:', err);
        return NextResponse.json(
            { message: "Something went wrong fetching posts" },
            { status: 500 }
        );
    }
}








export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log('[POST /api/posts] body received:', body);

    // ✅ Generate slug (unique and clean)
    const slug =
      body.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Math.random().toString(36).substring(2, 7);

    // Accept either `image` or legacy `img` from client
    const imageField = body.image ?? body.img ?? null;
    console.log('[POST /api/posts] imageField:', imageField);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        desc: body.desc,
        image: imageField,
        catSlug: body.catSlug || "uncategorized",
        userEmail: session.user.email,
        slug: slug,
      },
    });

    // normalize response to include `image` for frontend
    const response = { ...post, image: post?.image ?? post?.img ?? null };
    console.log('[POST /api/posts] created post:', response);
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("❌ Error creating post:", err);
    return NextResponse.json(
      { message: "Something went wrong.." },
      { status: 500 }
    );
  }
};
