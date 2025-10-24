import {prisma} from "@/utils/connect"
import { NextResponse } from "next/server"
  // get single post 
export const GET = async (req, { params }) => {
    const { slug } = await params;

   try{
    const post = await prisma.post.findUnique(
        {
            where:{slug},
            include : {user:true}
        }
    )
  
       // Normalize post so frontend can use `image` property (map from existing `img`)
       const response = { ...post, image: post?.image ?? post?.img ?? null };
       console.log('[GET /api/posts/[slug]] response image:', response.image);
       return NextResponse.json(response, { status: 200 });

    }catch (err) {
     console.log(err)
     return new NextResponse (
        JSON.stringify({message:"something went wrong.."},{status:500})
     )
    }
}