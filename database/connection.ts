import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function DatabseConnection(req: any, res: any) {
  await prisma
    .$connect()
    .then((data) => (res.db_status = 200))
    .catch((e) => {
      // throw e;
      res.db_status = "Data Base Not Connected";
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
