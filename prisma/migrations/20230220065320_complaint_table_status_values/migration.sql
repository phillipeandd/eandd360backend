/*
  Warnings:

  - The values [pending,accepted,rejected] on the enum `employee_complants_advices_suggestions_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `accepted_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `employee_complants_advices_suggestions` MODIFY `status` ENUM('active', 'resolved', '') NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `accepted_at` TIMESTAMP NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
