import { getBooks } from '@/services/books.service'
import { NextResponse } from 'next/server'

export async function GET() {
  const books = await getBooks()
  return NextResponse.json(books)
}