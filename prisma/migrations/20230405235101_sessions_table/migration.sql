-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" JSON NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_sid_key" ON "Sessions"("sid");
