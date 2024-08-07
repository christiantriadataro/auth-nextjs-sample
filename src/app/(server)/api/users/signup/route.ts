import {connect} from "@/helpers/databaseConfig";
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs"


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
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User created Successfully",
            success: true,
            savedUser
        })
        // basic validation zod?

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}