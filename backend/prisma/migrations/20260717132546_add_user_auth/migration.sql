-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE');

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "operator_id" TEXT;

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'OPERATORE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
