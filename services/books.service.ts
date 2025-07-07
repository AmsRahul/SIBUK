import prisma from '@/lib/db'

export const createBook = async (data: { nama: string; isbn: string; harga: number; penerbit: string; penulis: string }) => {
  return await prisma.book.create({ data })
}

export const getBooks = async () => {
  return await prisma.book.findMany({ orderBy: { nama: 'asc' } })
}

export const getBooksWithTransactions = async () => {
    const books =  await prisma.book.findMany({
    orderBy: { nama: 'asc' },
    include: {
      transactions: {
        orderBy: { date: 'desc' }, // urutkan transaksi dari terbaru
      },
    },
  })
    const booksWithStock = books.map((book) => {
    const totalIn = book.transactions
      .filter((tx) => tx.type === 'In')
      .reduce((sum, tx) => sum + tx.quantity, 0)

    const totalOut = book.transactions
      .filter((tx) => tx.type === 'Out')
      .reduce((sum, tx) => sum + tx.quantity, 0)

    const currentStock = totalIn - totalOut

    return {
      ...book,
      totalIn,
      totalOut,
      currentStock,
    }
  })

  return booksWithStock
}
export const getBookById = async (id: string) => {
  return await prisma.book.findUnique({ where: { book_id: id } })
}

export const updateBook = async (id: string, data: Partial<{ nama: string; isbn: string; harga: number, penerbit: string; penulis: string }>) => {
  return await prisma.book.update({ where: { book_id: id }, data })
}

export const deleteBook = async (id: string) => {
  return await prisma.book.delete({ where: { book_id: id } })
}