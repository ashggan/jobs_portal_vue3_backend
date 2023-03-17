-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "salary_max" INTEGER NOT NULL,
    "salary_min" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary_is_predicted" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contract_type" TEXT NOT NULL,
    "redirect_url" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

