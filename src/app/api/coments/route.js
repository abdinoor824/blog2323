import { getAuthSession } from "@/utils/auth";
import {prisma} from "@/utils/connect"
import { NextResponse } from "next/server"
  // get single post 
export const GET = async (req) =>{
    const {searchParams} = new URL(req.url);
    const postSlug =searchParams.get("postSlug")
      
   try{
    const comments = await prisma.comment.findMany(
        {
             where: postSlug ? { postSlug } : {},
            include : {user:true},
             orderBy: { createdAt: "desc" },
        }
    )
  
   return NextResponse.json( comments, { status: 200 });

    }catch (err) {
     console.log(err)
     return new NextResponse (
        JSON.stringify({message:"something went wrong.."},{status:500})
     )
    }
}
  // create comments
export const POST = async (req) =>{
   
const session = await getAuthSession();
 if (!session) {
    return NextResponse.json({ message:"not authenticated" }, { status: 401 });
 }




      
   try{
    const body = await req.json();
    const comment = await prisma.comment.create(
        {
          data:{...body,userEmail: session.user.email},
        }
    )
  
   return NextResponse.json( comment, { status: 200 });

    }catch (err) {
     console.log(err)
     return new NextResponse (
        JSON.stringify({message:"something went wrong.."},{status:500})
     )
    }
}