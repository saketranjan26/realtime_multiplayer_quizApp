/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.
  - Added the required column `correctOption` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Quiz_name_key";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctAnswer",
ADD COLUMN     "correctOption" TEXT NOT NULL;
