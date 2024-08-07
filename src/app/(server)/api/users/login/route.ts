import {connect} from "@/helpers/databaseConfig";
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";



export const POST = async (request: NextRequest) => {
    try {
        connect()

        const reqBody = await request.json();
        const {username, password} = reqBody;
        console.log(reqBody)

        // check if user exists
        const user = await User.findOne({username});
        if (!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword) {
            return NextResponse.json({error: "Invalid Password"}, {status: 400})
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        console.log(token)

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}