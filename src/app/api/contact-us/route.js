import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const saved = await Contact.create(body);

    return Response.json({
      success: true,
      message: "Message saved successfully",
      data: saved,
    });

  } catch (error) {
    console.log("CONTACT API ERROR:", error);

    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}