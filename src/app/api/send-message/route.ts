import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth";
import { Message } from '@/model/user.model'

export async function POST(request: Request) {
    await dbConnect()

    const { username, content } = await request.json()
    try {
        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json({
                success: false,
                messages: "User not found"
            }, { status: 404 })
        }
        //is user acceptinng

        if (!user.isAcceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: "user is not accepting the messages"
                }, { status: 401 }
            )
        }

        const newMessage = { content, createdAt: new Date() }
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json(
            {
                success: true,
                message: "message send successfully"
            },
            { status: 200 }
        )

    } catch (error: any) {
        return Response.json(
            {
                success: false,
                message: "Error Sending messages"
            },
            { status: 500 }
        )
    }
}