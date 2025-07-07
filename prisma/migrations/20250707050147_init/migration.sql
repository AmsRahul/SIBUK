-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('In', 'Out');

-- CreateTable
CREATE TABLE "Book" (
    "book_id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "penerbit" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;
