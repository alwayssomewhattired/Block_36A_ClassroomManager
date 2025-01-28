-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_instructorID_fkey";

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_instructorID_fkey" FOREIGN KEY ("instructorID") REFERENCES "instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
