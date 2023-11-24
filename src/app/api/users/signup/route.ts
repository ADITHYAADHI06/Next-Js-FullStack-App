
import {connect} from "../../../dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



connect();


export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json();
        // console.log(reqBody);
        
        const { username, email, password} =reqBody;

        //verifying User already Exists
        const user=await User.findOne({username});

        if (user) {
            return NextResponse.json({error:"user exists"},{status:400})
        }

        //hash password
        const salt=await bcryptjs.genSalt(10);
        const hashedpassword=await bcryptjs.hash(password,salt)

        //user creation
        const newUser=new User({
            username,
            email,
            password:hashedpassword
        })

        const savedUser=await newUser.save();
        console.log(savedUser);

        return NextResponse.json({ 
            message:"user saved successfully",
            success:true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{ status:500 })
    }
}


