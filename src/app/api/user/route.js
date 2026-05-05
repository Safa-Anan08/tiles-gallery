import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PATCH(req) {
  await connectDB();

  const { email, name, image } = await req.json();

  const updated = await User.findOneAndUpdate(
    { email },
    { name, image },
    { new: true }
  );

  return Response.json(updated);
}