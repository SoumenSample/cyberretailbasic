import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";
import bcrypt from "bcryptjs";

async function run() {
  await connectToDatabase();

  const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const name = process.env.SEED_ADMIN_NAME || "Admin";

  const existing = await UserModel.findOne({ email: email.toLowerCase() }).lean();
  if (existing) {
    console.log("Admin already exists:", existing.email);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email: email.toLowerCase(),
    phone: "", 
    passwordHash,
    globalRole: "ADMIN",
    isActive: true,
  });

  console.log("Created admin:", user._id.toString(), email);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
