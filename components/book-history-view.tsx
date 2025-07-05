"use client"

import { ArrowLeft, ArrowDown, ArrowUp, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Book, Transaction } from "@/app/page"

interface BookHistoryViewProps {
  books: Book[]
  transactions: Transaction[]
  selectedBookId: string
  onBack: () => void
}

export default function BookHistoryView({ books, transactions, selectedBookId, onBack }: BookHistoryViewProps) {
  const book = books.find((b) => b.id === selectedBookId)
  const bookTransactions = transactions
    .filter((t) => t.bookId === selectedBookId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
        <Button onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    )
  }

  const totalIn = bookTransactions.filter((t) => t.type === "in").reduce((sum, t) => sum + t.quantity, 0)
  const totalOut = bookTransactions.filter((t) => t.type === "out").reduce((sum, t) => sum + t.quantity, 0)
  const currentStock = totalIn - totalOut

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600">
            {book.title} ({book.id})
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total In</CardTitle>
            <ArrowDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalIn}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Out</CardTitle>
            <ArrowUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalOut}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
            <Badge
              variant={currentStock < 10 ? "destructive" : "default"}
              className={currentStock < 10 ? "" : "bg-green-100 text-green-800"}
            >
              {currentStock}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStock}</div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {bookTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No transactions found for this book.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={transaction.type === "in" ? "default" : "secondary"}
                          className={
                            transaction.type === "in"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }
                        >
                          <div className="flex items-center space-x-1">
                            {transaction.type === "in" ? (
                              <ArrowDown className="h-3 w-3" />
                            ) : (
                              <ArrowUp className="h-3 w-3" />
                            )}
                            <span>{transaction.type === "in" ? "Stock In" : "Stock Out"}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium">{transaction.quantity}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{transaction.location}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
