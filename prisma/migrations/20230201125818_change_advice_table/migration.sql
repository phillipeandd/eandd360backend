/*
  Warnings:

  - You are about to alter the column `accepted_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `employee_complants_advices_suggestions` ADD COLUMN `reply_admin` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `accepted_at` TIMESTAMP NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
