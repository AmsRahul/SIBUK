import { getBooks, createBook } from '@/services/books.service'
import { NextResponse } from 'next/server'

export async function GET() {
  const books = await getBooks()
  return NextResponse.json(books)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { nama, ISBN, Harga } = body

  const created = await createBook({ nama, ISBN, Harga })
  return NextResponse.json(created, { status: 201 })
}