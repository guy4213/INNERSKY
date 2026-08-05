-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'new';
ALTER TABLE "ContactSubmission" ADD COLUMN "notes" TEXT;
