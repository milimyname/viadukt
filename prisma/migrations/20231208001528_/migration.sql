-- CreateTable
CREATE TABLE "JsonLogic" (
    "id" TEXT NOT NULL,
    "query" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "JsonLogic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyUpgrade" (
    "id" SERIAL NOT NULL,
    "selectedUpgrade" TEXT NOT NULL,
    "homeSize" DOUBLE PRECISION NOT NULL,
    "currentEnergyConsumption" DOUBLE PRECISION NOT NULL,
    "energyPrice" DOUBLE PRECISION NOT NULL,
    "upgradeCosts" DOUBLE PRECISION NOT NULL,
    "energySavingsPercentage" DOUBLE PRECISION NOT NULL,
    "incentives" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "EnergyUpgrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JsonLogic_id_key" ON "JsonLogic"("id");

-- CreateIndex
CREATE INDEX "JsonLogic_user_id_idx" ON "JsonLogic"("user_id");

-- CreateIndex
CREATE INDEX "EnergyUpgrade_user_id_idx" ON "EnergyUpgrade"("user_id");

-- AddForeignKey
ALTER TABLE "JsonLogic" ADD CONSTRAINT "JsonLogic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergyUpgrade" ADD CONSTRAINT "EnergyUpgrade_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
