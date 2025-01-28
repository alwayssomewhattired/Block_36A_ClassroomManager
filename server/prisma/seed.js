// Clear and repopulate the database.

// const db = require("../db");
// const { faker } = require("@faker-js/faker");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// async function seed() {
//   console.log("Seeding the database.");
//   try {
// Clear the database.
//
// await db.query("DROP TABLE IF EXISTS student, instructor;");

// Recreate the tables
// await db.query(`
//   CREATE TABLE instructor (
//     id SERIAL PRIMARY KEY,
//     username TEXT UNIQUE NOT NULL,
//     password TEXT NOT NULL
//   );
//   CREATE TABLE student (
//     id SERIAL PRIMARY KEY,
//     name TEXT NOT NULL,
//     cohort TEXT NOT NULL,
//     instructorId INTEGER NOT NULL REFERENCES instructor(id) ON DELETE CASCADE
//   );
// `);

async function seed() {
  const deleteEverything = await prisma.instructor.deleteMany({});

  const ned = await prisma.instructor.create({
    data: {
      username: "ned",
      password: "1234",
      students: {
        create: [
          { name: "milkson", cohort: "ndkns" },
          { name: "milkdaughter", cohort: "ndkns" },
          { name: "mike", cohort: "ndkns" },
          { name: "mary", cohort: "ndkns" },
        ],
      },
    },
  });

  const alice = await prisma.instructor.create({
    data: {
      username: "alice",
      password: "4321",
      students: {
        create: [
          { name: "joe", cohort: "baaaa" },
          { name: "jay", cohort: "baaaa" },
          { name: "pip", cohort: "baaaa" },
          { name: "pat", cohort: "baaaa" },
        ],
      },
    },
  });

  const albert = await prisma.instructor.create({
    data: {
      username: "albert",
      password: "4839",
      students: {
        create: [
          { name: "batman", cohort: "caaaa" },
          { name: "patman", cohort: "caaaa" },
          { name: "catman", cohort: "caaaa" },
          { name: "pacman", cohort: "caaaa" },
        ],
      },
    },
  });

  const alien = await prisma.instructor.create({
    data: {
      username: "alien",
      password: "1010101",
      students: {
        create: [
          { name: "cracman", cohort: "zaaaa" },
          { name: "ihmad", cohort: "zaaaa" },
          { name: "zach", cohort: "zaaaa" },
          { name: "jill", cohort: "zaaaa" },
        ],
      },
    },
  });

  const milkman = await prisma.instructor.create({
    data: {
      username: "milkman",
      password: "million",
      students: {
        create: [
          { name: "phil", cohort: "abccba" },
          { name: "kranston", cohort: "abccba" },
          { name: "evan", cohort: "abccba" },
          { name: "stormwielder", cohort: "abccba" },
        ],
      },
    },
  });
}
seed();

// Add 5 instructors.
// await Promise.all(
//   [...Array(5)].map(() =>
//     db.query(
//       `INSERT INTO instructor (username, password) VALUES ($1, $2);`,
//       [faker.internet.userName(), faker.internet.password()]
//     )
//   )
// );

// Add 4 students for each instructor.
//     await Promise.all(
//       [...Array(20)].map((_, i) =>
//         db.query(
//           `INSERT INTO student (name, cohort, instructorId) VALUES ($1, $2, $3);`,
//           [
//             faker.person.fullName(),
//             faker.number.int({ min: 2000, max: 3000 }),
//             (i % 5) + 1,
//           ]
//         )
//       )
//     );

//     console.log("Database is seeded.");
//   } catch (err) {
//     console.error(err);
//   }
// }

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;
