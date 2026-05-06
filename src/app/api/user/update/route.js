import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { email, name, image } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("test");

    const result = await db.collection("user").updateOne(
      { email },
      {
        $set: {
          name,
          image,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}