import { NextResponse } from 'next/server'
import {
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '@/services/transactions.service'

export async function GET(
    _: Request, 
    context: { params: Promise<{ id: string }> }
)  {
     const { id } = await context.params
     const transaction = await getTransactionById(id)
     
  if (!transaction) {
    return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
  }
  return NextResponse.json(transaction)
}

export async function PUT(
    req: Request, 
     context: { params: Promise<{ id: string }> }
) {
  const data = await req.json()
 const { id } = await context.params
  try {
    const updated = await updateTransaction(id, data)
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Update failed', detail: error }, { status: 400 })
  }
}

export async function DELETE(
    _: Request, 
     context: { params: Promise<{ id: string }> }
) {
     const { id } = await context.params

  try {
    await deleteTransaction(id)
    return NextResponse.json({ message: 'Transaction deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed', detail: error }, { status: 400 })
  }
}