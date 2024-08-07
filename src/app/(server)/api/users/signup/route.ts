import {connect} from "@/helpers/databaseConfig";
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs"
import {bgCyan} from "next/dist/lib/picocolors";


connect()

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)

        // basic validation zod?

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}