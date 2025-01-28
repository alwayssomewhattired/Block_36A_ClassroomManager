/*
  Warnings:

  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `instructorID` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "instructorID" TEXT NOT NULL;

-- DropTable
DROP TABLE "teacher";

-- CreateTable
CREATE TABLE "instructor" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "instructor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "instructor_username_key" ON "instructor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_password_key" ON "instructor"("password");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_instructorID_fkey" FOREIGN KEY ("instructorID") REFERENCES "instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
