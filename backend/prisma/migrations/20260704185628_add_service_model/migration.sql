-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'assignment',
    "color" TEXT NOT NULL DEFAULT 'text-primary',
    "titleHe" TEXT NOT NULL DEFAULT '',
    "titleEn" TEXT NOT NULL DEFAULT '',
    "descHe" TEXT NOT NULL DEFAULT '',
    "descEn" TEXT NOT NULL DEFAULT '',
    "includesHe" TEXT NOT NULL DEFAULT '',
    "includesEn" TEXT NOT NULL DEFAULT '',
    "resultHe" TEXT NOT NULL DEFAULT '',
    "resultEn" TEXT NOT NULL DEFAULT '',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
