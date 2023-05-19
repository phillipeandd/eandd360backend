/*
  Warnings:

  - You are about to drop the column `learning` on the `performance` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `performance` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `performance` table. All the data in the column will be lost.
  - You are about to alter the column `accepted_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `attitude_towards_others` to the `performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attitude_towards_work` to the `performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedback_positively` to the `performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `integrity` to the `performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownership` to the `performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem_solving` to the `performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professional_development` to the `performance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `performance` DROP COLUMN `learning`,
    DROP COLUMN `observation`,
    DROP COLUMN `priority`,
    ADD COLUMN `attitude_towards_others` INTEGER NOT NULL,
    ADD COLUMN `attitude_towards_work` INTEGER NOT NULL,
    ADD COLUMN `feedback_positively` INTEGER NOT NULL,
    ADD COLUMN `integrity` INTEGER NOT NULL,
    ADD COLUMN `ownership` INTEGER NOT NULL,
    ADD COLUMN `problem_solving` INTEGER NOT NULL,
    ADD COLUMN `professional_development` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `accepted_at` TIMESTAMP NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
