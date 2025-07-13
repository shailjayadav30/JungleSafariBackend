-- CreateEnum
CREATE TYPE "Type" AS ENUM ('JEEP', 'MARUTI', 'LANDROVER', 'TATAHARIER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('STANDARD', 'PREMIUM', 'LUXURY');

-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('SAFARI_BOOKING', 'GENERAL_INFORMATION', 'CUSTOM_SAFARI', 'GROUP_BOOKING', 'CUSTOMER_SUPPORT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "accommodationType" "AccommodationType" NOT NULL,
    "specialRequest" TEXT,
    "safariId" TEXT NOT NULL,
    "userId" TEXT,
    "totalPrice" DOUBLE PRECISION,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicleNo" TEXT NOT NULL,
    "capacity" INTEGER,
    "vehicleType" "Type" NOT NULL DEFAULT 'JEEP',
    "typeId" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicleName" TEXT,
    "type" "Type" NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 6,
    "totalvehicle" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Safari" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviews" INTEGER NOT NULL,
    "bestTime" TEXT NOT NULL,
    "safariImage" TEXT,
    "highlights" TEXT NOT NULL,

    CONSTRAINT "Safari_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "inquiryType" "InquiryType" NOT NULL,
    "Subject" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vehicleNo_key" ON "Vehicle"("vehicleNo");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_type_key" ON "VehicleType"("type");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_safariId_fkey" FOREIGN KEY ("safariId") REFERENCES "Safari"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "VehicleType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
