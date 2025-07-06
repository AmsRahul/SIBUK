"use client"

import { Plus, History, TrendingUp, TrendingDown, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Book, BookStock } from "@/app/page"

import { getBooksWithTransactions} from '@/services/books.service'

type ViewType = "dashboard" | "add-book" | "stock-in" | "stock-out" | "book-history"

// interface DashboardProps {
//   books: Book[]
//   bookStocks: BookStock[]
//   onNavigate: (view: ViewType, bookId?: string) => void
// }

export default async function Dashboard() {
  const books = await getBooksWithTransactions()
  const totalBooks = books.length
  // const totalStock = bookStocks.reduce((sum, stock) => sum + stock.currentStock, 0)
  // const lowStockBooks = bookStocks.filter((stock) => stock.currentStock < 10).length


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Book inventory overview</p>
        </div>
        {/* <Button onClick={() => onNavigate("add-book")} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Book</span>
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">Different titles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">{totalStock}</div> */}
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Books in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">0</div>
            {/* <div className="text-2xl font-bold text-red-600">{lowStockBooks}</div> */}
            <p className="text-xs text-muted-foreground">Books below 10 units</p>
          </CardContent>
        </Card>
      </div>

      {/* Books Table */}
      <Card>
        <CardHeader>
          <CardTitle>Book Stock Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book ID</TableHead>
                  <TableHead>Book Title</TableHead>
                  <TableHead className="text-center">Total In</TableHead>
                  <TableHead className="text-center">Total Out</TableHead>
                  <TableHead className="text-center">Current Stock</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => {

                  return (
                    <TableRow key={book.book_id}>
                      <TableCell className="font-medium">{book.ISBN}</TableCell>
                      <TableCell>{book.nama}</TableCell>
                      <TableCell className="text-center">{book.totalIn}</TableCell>
                      <TableCell className="text-center">{book.totalOut}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={book.currentStock < 10 ? "destructive" : "default"}
                          className={book.currentStock < 10 ? "" : "bg-green-100 text-green-800 hover:bg-green-200"}
                        >
                          {book.currentStock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1 bg-transparent"
                          // onClick={() => onNavigate("book-history", book.id)}
                        >
                          <History className="h-3 w-3" />
                          <span className="hidden sm:inline">View History</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
