import prisma from '@/lib/db'

export const getTransactions = async () => {
  return await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
    include: {
      book: true, // untuk mengambil info buku terkait
    },
  })
}

export async function createTransaction(data: {
  book_id: string
  type: string
  quantity: number
  date: Date
  location: string
}) {
  return await prisma.transaction.create({
    data,
  })
}