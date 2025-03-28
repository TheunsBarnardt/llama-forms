import prisma from "@/app/lib/prisma";


async function main() {
  const user = await prisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "Admin",
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
