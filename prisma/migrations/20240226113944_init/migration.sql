-- CreateTable
CREATE TABLE "stock_report" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "current" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "stock_report_pkey" PRIMARY KEY ("id")
);
