import prisma from '@/lib/db'

export const getTransactions = async () => {
  return await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
    include: {
      book: true, // untuk mengambil info buku terkait
    },
  })
}
