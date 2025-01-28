-- CreateTable
CREATE TABLE "teacher" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teacher_username_key" ON "teacher"("username");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_password_key" ON "teacher"("password");
