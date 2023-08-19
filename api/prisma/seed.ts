import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

const createRoles = async () => {
  const defaultRoles = [
    { name: 'Admin' },
    { name: 'Regular' },
    { name: 'Premium' },
  ];
  console.log('Seeding...');
  /// --------- Roles ---------------
  const findRoles = await prisma.role.findMany({
    where: {
      name: {
        in: defaultRoles.map((role) => role.name),
      },
    },
  });
  if (findRoles.length === defaultRoles.length) {
    console.log('Roles already seeded');
    return;
  }
  const initRoles = defaultRoles.filter((role) =>
    findRoles.every((r) => r.name !== role.name),
  );
  await prisma.role.createMany({ data: initRoles });
};

async function main() {
  dotenv.config();
  createRoles();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
