import { History, TrendingUp, TrendingDown, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getBooksWithTransactions } from "@/services/books.service";

export default async function Dashboard() {
  const books = await getBooksWithTransactions();
  const totalBooks = books.length;
  const totalStock = books.reduce((sum, b) => sum + b.currentStock, 0);
  const lowStockBooks = books.filter((b) => b.currentStock < 10).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Book inventory overview</p>
        </div>
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
            <div className="text-2xl font-bold">{totalStock}</div>
            <p className="text-xs text-muted-foreground">Books in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Alert
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {lowStockBooks}
            </div>
            <p className="text-xs text-muted-foreground">
              Books below 10 units
            </p>
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
                  <TableHead>ISBN</TableHead>
                  <TableHead>Book Title</TableHead>
                  <TableHead className="text-center">Total In</TableHead>
                  <TableHead className="text-center">Total Out</TableHead>
                  <TableHead className="text-center">Current Stock</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.book_id}>
                    <TableCell className="font-medium">{book.isbn}</TableCell>
                    <TableCell>{book.nama}</TableCell>
                    <TableCell className="text-center">
                      {book.totalIn}
                    </TableCell>
                    <TableCell className="text-center">
                      {book.totalOut}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          book.currentStock < 10 ? "destructive" : "default"
                        }
                        className={
                          book.currentStock < 10
                            ? ""
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }
                      >
                        {book.currentStock}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={`/books/${book.book_id}/transactions`}
                        className="inline-flex items-center space-x-1 text-sm px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                      >
                        <History className="h-3 w-3" />
                        <span className="hidden sm:inline">View History</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
