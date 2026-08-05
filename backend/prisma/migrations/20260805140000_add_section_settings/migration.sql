-- CreateTable
CREATE TABLE "SectionSetting" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionSetting_key_key" ON "SectionSetting"("key");
