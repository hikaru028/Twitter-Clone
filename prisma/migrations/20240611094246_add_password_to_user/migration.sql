/*
  Warnings:

  - You are about to drop the column `pass` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Make the password column nullable first
ALTER TABLE "User" ADD COLUMN "password" TEXT;

-- Update the existing rows with a default password or handle accordingly
UPDATE "User" SET "password" = 'defaultpassword' WHERE "password" IS NULL;

-- Finally, make the password column required
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;