import { getTransactions, createTransaction } from '@/services/transactions.service'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const book_id = searchParams.get("book_id") || undefined;

  const transactions = await getTransactions(book_id);
  return NextResponse.json(transactions);
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