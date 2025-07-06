"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Dashboard from "@/components/dashboard"
import AddBookForm from "@/components/add-book-form"
import IncomingTransactionForm from "@/components/incoming-transaction-form"
import OutgoingTransactionForm from "@/components/outgoing-transaction-form"
import BookHistoryView from "@/components/book-history-view"

export interface Book {
  id: string
  title: string
}

export interface Transaction {
  id: string
  bookId: string
  type: "in" | "out"
  quantity: number
  date: string
  location: string
}

export interface BookStock {
  bookId: string
  totalIn: number
  totalOut: number
  currentStock: number
}

type ViewType = "dashboard" | "add-book" | "stock-in" | "stock-out" | "book-history"

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const [selectedBookId, setSelectedBookId] = useState<string>("")

  const [books, setBooks] = useState<Book[]>([
    { id: "B001", title: "The Great Gatsby" },
    { id: "B002", title: "To Kill a Mockingbird" },
    { id: "B003", title: "1984" },
    { id: "B004", title: "Pride and Prejudice" },
    { id: "B005", title: "The Catcher in the Rye" },
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "T001", bookId: "B001", type: "in", quantity: 50, date: "2024-01-15", location: "Main Warehouse" },
    { id: "T002", bookId: "B001", type: "out", quantity: 12, date: "2024-01-20", location: "Store A" },
    { id: "T003", bookId: "B002", type: "in", quantity: 30, date: "2024-01-18", location: "Main Warehouse" },
    { id: "T004", bookId: "B002", type: "out", quantity: 8, date: "2024-01-22", location: "Store B" },
    { id: "T005", bookId: "B003", type: "in", quantity: 25, date: "2024-01-10", location: "Secondary Warehouse" },
    { id: "T006", bookId: "B003", type: "out", quantity: 15, date: "2024-01-25", location: "Online Orders" },
    { id: "T007", bookId: "B004", type: "in", quantity: 40, date: "2024-01-12", location: "Main Warehouse" },
    { id: "T008", bookId: "B005", type: "in", quantity: 20, date: "2024-01-14", location: "Main Warehouse" },
    { id: "T009", bookId: "B005", type: "out", quantity: 5, date: "2024-01-28", location: "Store C" },
  ])

  const [bookStocks, setBookStocks] = useState<BookStock[]>([])

  useEffect(() => {
    const calculateStocks = () => {
      const stocks = books.map((book) => {
        const bookTransactions = transactions.filter((t) => t.bookId === book.id)
        const totalIn = bookTransactions.filter((t) => t.type === "in").reduce((sum, t) => sum + t.quantity, 0)
        const totalOut = bookTransactions.filter((t) => t.type === "out").reduce((sum, t) => sum + t.quantity, 0)

        return {
          bookId: book.id,
          totalIn,
          totalOut,
          currentStock: totalIn - totalOut,
        }
      })
      setBookStocks(stocks)
    }

    calculateStocks()
  }, [books, transactions])

  const addBook = (book: Book) => {
    setBooks((prev) => [...prev, book])
  }

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: `T${String(transactions.length + 1).padStart(3, "0")}`,
    }
    setTransactions((prev) => [...prev, newTransaction])
  }

  const navigateTo = (view: ViewType, bookId?: string) => {
    setCurrentView(view)
    if (bookId) {
      setSelectedBookId(bookId)
    }
  }

  const goToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedBookId("")
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />
      case "add-book":
        return <AddBookForm onAddBook={addBook} onBack={goToDashboard} />
      case "stock-in":
        return <IncomingTransactionForm books={books} onAddTransaction={addTransaction} onBack={goToDashboard} />
      case "stock-out":
        return <OutgoingTransactionForm books={books} onAddTransaction={addTransaction} onBack={goToDashboard} />
      case "book-history":
        return (
          <BookHistoryView
            books={books}
            transactions={transactions}
            selectedBookId={selectedBookId}
            onBack={goToDashboard}
          />
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navigation currentView={currentView} onNavigate={navigateTo} /> */}
      <main className="container mx-auto px-4 py-8">{renderCurrentView()}</main>
    </div>
  )
}
