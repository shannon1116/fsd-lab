import 'dotenv/config';

import { PrismaClient } from "../src/generated/prisma/client";
import { roleSeedData, departmentSeedData, leadershipEmployeeSeedData, employeeSeedData } from "./seedData";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {
    // clear table
    
    await prisma.$transaction([
        prisma.employee.deleteMany(),
        prisma.leadershipEmployee.deleteMany(),
        prisma.department.deleteMany(),
        prisma.role.deleteMany(),
    ]);

    // insert departments to db
    const departments = await prisma.department.createMany(
        {
            data: departmentSeedData,
            skipDuplicates: true
        }
    );

    // insert roles to db
    const roles = await prisma.role.createMany(
        {
            data: roleSeedData,
            skipDuplicates: true
        }
    );

    // insert employees to db
    const employees = await prisma.employee.createMany(
        {
            data: employeeSeedData,
            skipDuplicates: true
        }
    );

    // insert leadershipEmployees to db
    const leadershipEmployees = await prisma.leadershipEmployee.createMany(
        {
            data: leadershipEmployeeSeedData,
            skipDuplicates: true
        }
    );

    console.log(`
        Seed complete:
        - Departments: ${departments.count}
        - Roles: ${roles.count}
        - Friends: ${employees.count}
        - Reviews: ${leadershipEmployees.count}
        `);
    }

main().then(
    async() => {
        await prisma.$disconnect()
    }
).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
}); 