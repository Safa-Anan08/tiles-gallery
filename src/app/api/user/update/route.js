// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function PUT(req) {
//   await connectDB();

//   const { email, name, image } = await req.json();

//   const user = await User.findOneAndUpdate(
//     { email },
//     { name, image },
//     { new: true, upsert: true }
//   );

//   return Response.json(user);
// }

import client from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const body = await req.json();

  const db = client.db("test");
  const users = db.collection("user");

  await users.updateOne(
    { email: body.email },
    {
      $set: {
        name: body.name,
        image: body.image,
      },
    }
  );

  return NextResponse.json({ success: true });
}