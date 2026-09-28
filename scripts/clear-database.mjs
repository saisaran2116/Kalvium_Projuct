import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Clearing dummy data from Campus Hub database...");

  // 1. Delete all event-related dummy records
  const deletedApprovals = await prisma.approvalHistory.deleteMany();
  console.log(`Deleted ${deletedApprovals.count} approval histories`);

  const deletedAnalyses = await prisma.eventAnalysis.deleteMany();
  console.log(`Deleted ${deletedAnalyses.count} event analyses`);

  const deletedSaved = await prisma.savedEvent.deleteMany();
  console.log(`Deleted ${deletedSaved.count} saved events`);

  const deletedEvents = await prisma.event.deleteMany();
  console.log(`Deleted ${deletedEvents.count} events`);

  // 2. Delete mock student and club users, keeping only the Campus Manager
  const deletedUsers = await prisma.user.deleteMany({
    where: {
      email: {
        not: "manager@campus.edu",
      },
    },
  });
  console.log(`Deleted ${deletedUsers.count} mock users (kept campus manager)`);

  const remainingEvents = await prisma.event.count();
  const remainingUsers = await prisma.user.count();

  console.log(`\n✨ Database is now clean!`);
  console.log(`Remaining Events: ${remainingEvents}`);
  console.log(`Remaining Users: ${remainingUsers} (Manager: manager@campus.edu)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
