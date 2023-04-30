import { generateAccessToken } from "@/lib/generateToken";
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    mongooseConnect();
    switch (req.method) {
        case "POST":
            await login(req, res);
            break;
        case "GET":
            // await getProducts(req, res);
            break;
        case "PUT":
            // await updateProduct(req, res);
            break;
        case "DELETE":
            // await deleteProduct(req, res);
            break;
    }
};


const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name, email, image, type } = req.body;
        const user = await User.findOne({ email });
        
        if (user) {
            const createdPassword = email + process.env.SIGNIN_SECRET;
            // const isMatch: boolean = bcrypt.compareSync(createdPassword, user.password || "");
            // if (!isMatch) return res.status(403).json({ msg: "Password isn't match" });
            const { ...user2 } = user;
            const access_token = generateAccessToken({ id: user._id });
            res.json({ msg: "Login success!", access_token, user: user2 });
        } else {
            // create user and login
            const createdPassword = email + process.env.SIGNIN_SECRET;
            const hashedPassword = bcrypt.hashSync(createdPassword, 10);
            const newUser = await User.create({ name, email, image, type, password: hashedPassword });
            const { ...user } = newUser;
            const access_token = generateAccessToken({ id: user._id });
            res.json({ msg: "Login success!", access_token, user: user._doc });
        }
    } catch (error) {

        console.log(error);

    }




};