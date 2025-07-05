"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Book, Transaction } from "@/app/page"

interface OutgoingTransactionFormProps {
  books: Book[]
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void
  onBack: () => void
}

export default function OutgoingTransactionForm({ books, onAddTransaction, onBack }: OutgoingTransactionFormProps) {
  const [formData, setFormData] = useState({
    bookId: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.bookId && formData.quantity && formData.date && formData.location) {
      onAddTransaction({
        bookId: formData.bookId,
        type: "out",
        quantity: Number.parseInt(formData.quantity),
        date: formData.date,
        location: formData.location,
      })
      onBack()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Out Transaction</h1>
          <p className="text-gray-600">Record outgoing book inventory</p>
        </div>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowUp className="h-5 w-5 text-red-600" />
            <span>Outgoing Stock</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bookId">Select Book</Label>
              <Select
                value={formData.bookId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, bookId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book" />
                </SelectTrigger>
                <SelectContent>
                  {books.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.id} - {book.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                placeholder="e.g., 10"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Destination Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="e.g., Store A"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Record Transaction
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
