-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Untitled Building',
    "upgrade_type" TEXT NOT NULL DEFAULT 'Basic',
    "upgrade_date" TIMESTAMP(3) NOT NULL,
    "upgraded_energy_consumption" DOUBLE PRECISION NOT NULL,
    "energy_savings_percentage" DOUBLE PRECISION NOT NULL,
    "projected_annual_savings" DOUBLE PRECISION NOT NULL,
    "current_energy_price" DOUBLE PRECISION NOT NULL,
    "current_energy_consumption" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
