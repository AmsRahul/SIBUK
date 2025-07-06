import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Book
  const book1 = await prisma.book.create({
    data: {
      nama: 'Pemrograman JavaScript',
      ISBN: '978-1234567890',
      Harga: 75000,
    },
  })

  const book2 = await prisma.book.create({
    data: {
      nama: 'Database dengan PostgreSQL',
      ISBN: '978-0987654321',
      Harga: 85000,
    },
  })

  // Seed Transaction
  await prisma.transaction.createMany({
    data: [
      {
        book_id: book1.book_id,
        type: 'IN',
        quantity: 10,
        date: new Date(),
        location: 'Gudang A',
      },
      {
        book_id: book2.book_id,
        type: 'OUT',
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