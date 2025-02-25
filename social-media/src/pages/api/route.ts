import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectionStr } from "../../lib/db"
import {User} from "../../lib/model/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    await mongoose.connect(connectionStr,{dbName:"UserDB"});
    const data = await User.find();
    console.log("hiiii",data); 
    res.status(200).json({ result: data });
}
