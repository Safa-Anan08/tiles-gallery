import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const client = await clientPromise;
  const db = client.db("tilesDB");

  const data = await db
    .collection("wishlist")
    .find({ userEmail: email })
    .toArray();

  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("tilesDB");

  await db.collection("wishlist").insertOne(body);

  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("tilesDB");

  const result = await db.collection("wishlist").deleteOne({
    tileId: body.tileId,
    userEmail: body.userEmail,
  });

  return NextResponse.json({ success: true, result });
}