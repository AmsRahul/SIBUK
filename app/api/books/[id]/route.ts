import {  getBookById,
  updateBook,
  deleteBook, } from '@/services/books.service'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const book = await getBookById(id)

  if (!book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 })
  }

  return NextResponse.json(book)
}

export async function PUT(
  req: Request, 
  context: { params: Promise<{ id: string }> }
) {
  const body = await req.json()
  const { id } = await context.params
  const updated = await updateBook(id, body)

 try {
    const updated = await updateBook(id, body)

    if (!updated) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update failed:', error)
    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> } // 🔁 gunakan Promise agar bisa di-await
) {
  const { id } = await context.params

  try {
    await deleteBook(id)
    return NextResponse.json({ message: 'Book deleted' })
  } catch (error) {
    console.error('Delete failed:', error)
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 })
  }
}