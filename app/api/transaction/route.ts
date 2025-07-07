import { getTransactions, createTransaction } from '@/services/transactions.service'
import { NextResponse } from 'next/server'

export async function GET() {
  const books = await getTransactions()
  return NextResponse.json(books)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { book_id, type, quantity, date, location } = body

    // Validasi dasar
    if (!book_id || !type || !quantity || !date || !location) {
      return NextResponse.json(
        { error: 'Data transaksi tidak lengkap' },
        { status: 400 }
      )
    }

    // Buat transaksi via service
    const transaction = await createTransaction({
      book_id,
      type,
      quantity,
      date: new Date(date),
      location,
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Gagal membuat transaksi:', error)
    return NextResponse.json(
      { error: 'Gagal membuat transaksi' },
      { status: 500 }
    )
  }
}