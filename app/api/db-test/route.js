import dbConnect from "@/app/lib/mongodb";
//import User from "@/app/models/User";

export async function GET() {
  await dbConnect();

  //const users = await User.find({});
  // return Response.json({ users });
  return Response.json({ message: "MONGODB connected successfully..." });
}
