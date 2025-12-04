import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function GET() {
  await dbConnect();

  const users = await User.find({});
  return Response.json({ users });
}
