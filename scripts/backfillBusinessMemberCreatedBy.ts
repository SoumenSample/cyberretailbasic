import { connectToDatabase } from "@/lib/db";
import { BusinessModel } from "@/models/business";
import { BusinessMemberModel } from "@/models/businessMember";

async function run() {
  await connectToDatabase();

  const businesses = await BusinessModel.find({}).select({ businessId: 1, createdBy: 1 }).lean();

  for (const b of businesses) {
    if (!b.businessId) continue;
    if (!b.createdBy) continue;

    const res = await BusinessMemberModel.updateMany(
      { businessId: b.businessId, createdBy: null },
      { $set: { createdBy: b.createdBy } }
    );

    console.log(`Updated members for ${b.businessId}:`, res.modifiedCount);
  }

  console.log("Backfill complete");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
