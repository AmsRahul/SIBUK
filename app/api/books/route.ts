import { getBooks, createBook } from '@/services/books.service'
import { NextResponse } from 'next/server'

export async function GET() {
  const books = await getBooks()
  return NextResponse.json(books)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { nama, isbn, harga, penerbit, penulis } = body

  const created = await createBook({ nama, isbn, harga, penerbit, penulis })
  return NextResponse.json(created, { status: 201 })
}