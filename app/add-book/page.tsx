"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function AddBookForm() {
const router = useRouter();

  const [formData, setFormData] = useState({
    nama: "",
    isbn: "",
    harga: "",
    penerbit: "",
    penulis: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        harga: parseInt(formData.harga),
      }),
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
          <p className="text-gray-600">Add a new book to your inventory</p>
        </div>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Book Title</Label>
              <Input
                id="nama"
                name="nama"
                type="text"
                placeholder="e.g., The Lord of the Rings"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                type="text"
                placeholder="e.g., 978-1234567890"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="harga">Price</Label>
              <Input
                id="harga"
                name="harga"
                type="number"
                min={0}
                placeholder="e.g., 120000"
                value={formData.harga}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="penerbit">Publisher</Label>
              <Input
                id="penerbit"
                name="penerbit"
                type="text"
                placeholder="e.g., Gramedia"
                value={formData.penerbit}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="penulis">Author</Label>
              <Input
                id="penulis"
                name="penulis"
                type="text"
                placeholder="e.g., J.R.R. Tolkien"
                value={formData.penulis}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
