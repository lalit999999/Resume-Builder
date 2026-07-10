-- AlterEnum
ALTER TYPE "CompileStatus" RENAME TO "CompileStatus_old";
CREATE TYPE "CompileStatus" AS ENUM ('queued', 'processing', 'completed', 'failed');
ALTER TABLE "ResumeVersion" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ResumeVersion" ALTER COLUMN "status" TYPE "CompileStatus" USING (status::text::"CompileStatus");
ALTER TABLE "ResumeVersion" ALTER COLUMN "status" SET DEFAULT 'queued';
DROP TYPE "CompileStatus_old";

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ResumeVersion" ADD COLUMN "cloudinaryPublicId" TEXT,
ADD COLUMN "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Template" ADD COLUMN "description" TEXT,
ADD COLUMN "previewImageUrl" TEXT,
ADD COLUMN "category" TEXT,
ADD COLUMN "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "thumbnailColor" TEXT,
ADD COLUMN "popular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
