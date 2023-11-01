/*
  Warnings:

  - You are about to alter the column `status` on the `documentrequests` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `documentrequests` MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELED') NOT NULL;
