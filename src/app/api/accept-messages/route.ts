import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth";


export async function POST(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Error finding user"
            },
            { status: 401 }
        )
    }

    const userId = user._id
    const { acceptMessage } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessage },
            { new: true }
        )
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "failed to update user"
            }, {
                status: 401
            })
        }

        return Response.json({
                success: true,
                message: "Messages acceptance status updated successfully",
                updatedUser
            }, {
                status: 200
            })
    } catch (error) {
        console.log("failes to update user status to accept messages")
        return Response.json(
            {
                success: false,
                message: "failes to update user status to accept messages"
            }, {
            status: 500
        }
        )
    }
}

export async function GET(request:Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    try {
        if (!session || !session.user) {
            return Response.json(
                {
                    success: false,
                    message: "Error finding user"
                },
                { status: 401 }
            )
        }
    
        const userId = user._id
        
        const foundedUser = await UserModel.findById({userId})
    
        if(!foundedUser){
            return Response.json({
                success: false,
                message:  "User not found"
            }, {status: 404})
        }
    
        return Response.json(
            {
                success: true,
                isAcceptingMessages: foundedUser.isAcceptingMessage
            },
            {
                status: 200
            }
        )
    } catch (error: any) {
        console.log("Error", error);
        return Response.json(
                {
                    success: false,
                    message: "Error in getting messages"
                },
                { status: 500 }
            )
    }
}