import { getTransactions } from '@/services/transactions.service'
import { NextResponse } from 'next/server'

export async function GET() {
  const books = await getTransactions()
  return NextResponse.json(books)
}