/*
  Warnings:

  - Added the required column `auth_provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('CREDENTIALS', 'GOOGLE', 'GITHUB');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth_provider" "AuthProvider" NOT NULL;
