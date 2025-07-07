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
  type: "In" | "Out"
  quantity: number
  date: Date
  location: string
}) {
  return await prisma.transaction.create({
    data,
  })
}

export async function getTransactionById(id: string) {
  return await prisma.transaction.findUnique({
    where: { id },
    include: { book: true },
  })
}

// UPDATE
export async function updateTransaction(id: string, data: Partial<{
  book_id: string
  type: "In" | "Out"
  quantity: number
  date: Date
  location: string
}>) {
  return await prisma.transaction.update({
    where: { id },
    data,
  })
}

// DELETE
export async function deleteTransaction(id: string) {
  return await prisma.transaction.delete({
    where: { id },
  })
}
