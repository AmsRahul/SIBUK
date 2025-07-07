import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Book
  const book1 = await prisma.book.create({
    data: {
      nama: "Pemrograman JavaScript",
      isbn: "978-1234567890",
      harga: 75000,
      penerbit: "Penerbit A",
      penulis: "Penulis B",
    },
  });

  const book2 = await prisma.book.create({
    data: {
      nama: 'Database dengan PostgreSQL',
      isbn: '978-0987654321',
      harga: 85000,
      penerbit: 'Penerbit A',
      penulis: 'Penulis B',
    },
  })

  // Seed Transaction
  await prisma.transaction.createMany({
    data: [
      {
        book_id: book1.book_id,
        type: 'In',
        quantity: 10,
        date: new Date(),
        location: 'Gudang A',
      },
      {
        book_id: book2.book_id,
        type: 'Out',
        quantity: 2,
        date: new Date(),
        location: 'Toko B',
      },
    ],
  })
}

main()
  .then(() => {
    console.log('✅ Seeding berhasil!')
  })
  .catch((e) => {
    console.error('❌ Seeding gagal:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })