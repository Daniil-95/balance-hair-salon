-- Add editable homepage section titles/subtitles to site settings
ALTER TABLE "SiteSettings" ADD COLUMN "servicesSectionTitle" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN "servicesSectionSub" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN "pricingSectionTitle" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN "pricingSectionSub" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN "contactSectionTitle" TEXT;
ALTER TABLE "SiteSettings" ADD COLUMN "contactSectionSub" TEXT;
