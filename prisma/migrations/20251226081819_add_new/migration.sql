/*
  Warnings:

  - You are about to drop the column `location` on the `Dustbin` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Household` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Dustbin` DROP COLUMN `location`;

-- AlterTable
ALTER TABLE `Household` DROP COLUMN `location`;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `zipcode` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NULL,
    `householdId` INTEGER NULL,
    `dustbinId` INTEGER NULL,

    UNIQUE INDEX `Location_userId_key`(`userId`),
    UNIQUE INDEX `Location_householdId_key`(`householdId`),
    UNIQUE INDEX `Location_dustbinId_key`(`dustbinId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_householdId_fkey` FOREIGN KEY (`householdId`) REFERENCES `Household`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_dustbinId_fkey` FOREIGN KEY (`dustbinId`) REFERENCES `Dustbin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
