"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Save, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Book = {
  book_id: string;
  nama: string;
  isbn: string;
};

export default function StockInPage() {
    // getBooks;
const [books, setBooks] = useState<Book[]>([]);
    
  const [formData, setFormData] = useState({
    book_id: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
  });

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.book_id &&
      formData.quantity &&
      formData.date &&
      formData.location
    ) {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity),
          type: "In",
        }),
      });
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Stock In Transaction
          </h1>
          <p className="text-gray-600">Record incoming book inventory</p>
        </div>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowDown className="h-5 w-5 text-green-600" />
            <span>Incoming Stock</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="book_id">Select Book</Label>
              <Select
                value={formData.book_id}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, book_id: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book" />
                </SelectTrigger>
                <SelectContent>
                  {books.map((book) => (
                    <SelectItem key={book.book_id} value={book.book_id}>
                      {book.nama} ({book.isbn})
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
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Source Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
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
  );
}
