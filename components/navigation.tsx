"use client";

import { Book, Package, ArrowDown, ArrowUp, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ViewType =
  | "dashboard"
  | "add-book"
  | "stock-in"
  | "stock-out"
  | "book-history";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { view: "dashboard" as ViewType, label: "Dashboard", icon: Home },
    { view: "add-book" as ViewType, label: "Add Book", icon: Book },
    { view: "stock-in" as ViewType, label: "Stock In", icon: ArrowDown },
    { view: "stock-out" as ViewType, label: "Stock Out", icon: ArrowUp },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              BookInventory
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                (pathname === "/" && item.view === "dashboard") ||
                pathname === `/${item.view}`;

              return (
                <Link
                  key={item.view}
                  href={`/${item.view === "dashboard" ? "" : item.view}`}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden">
            <select
              className="border rounded-md px-3 py-2 text-sm"
              value={pathname.replace("/", "") || "dashboard"}
              onChange={(e) => {
                window.location.href = `/${
                  e.target.value === "dashboard" ? "" : e.target.value
                }`;
              }}
            >
              {navItems.map((item) => (
                <option key={item.view} value={item.view}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
