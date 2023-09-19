/*
  Warnings:

  - You are about to drop the column `basic_salary` on the `payroll` table. All the data in the column will be lost.
  - Added the required column `basic_salary` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payroll` DROP COLUMN `basic_salary`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `basic_salary` DOUBLE NOT NULL,
    ADD COLUMN `cin` VARCHAR(191) NOT NULL;
