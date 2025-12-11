import clientPromise from "@/app/lib/mongodb";

export async function getUserFromDb(email) {
  try {
    // connect to MongoDB
    const client = await clientPromise;
    const db = client.db(); // uses default DB from connection string

    // find user by email
    const user = await db.collection("users").findOne({ email });

    return user || null;
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    return null;
  }
}
