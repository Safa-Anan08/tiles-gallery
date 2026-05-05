import { connectDB } from "lib/mongodb";
import Tile from "models/Tile";

export async function GET() {
  await connectDB();

  const tiles = await Tile.find();

  return Response.json(tiles);
}