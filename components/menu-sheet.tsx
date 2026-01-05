"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MenuIcon, Home, CalendarDays, LogOut, LogIn } from "lucide-react";

const categories = [
  { label: "Cabelo", search: "cabelo" },
  { label: "Barba", search: "barba" },
  { label: "Acabamento", search: "acabamento" },
  { label: "Sobrancelha", search: "sobrancelha" },
  { label: "Massagem", search: "massagem" },
  { label: "Hidratacao", search: "hidratacao" },
];

const MenuSheet = () => {
  // State to track authentication (starts as logged in)
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader className="border-b border-border px-5 py-6 text-left">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-6">
          <div className="flex items-center justify-between px-5">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src="" />
                  <AvatarFallback>PL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">Pedro Lucas</span>
                  <span className="text-sm text-muted-foreground">
                    pedrolucas@gmail.com
                  </span>
                </div>
              </div>
            ) : (
              <>
                <p className="font-semibold">Olá. Faça seu login!</p>
                <Button className="gap-3 rounded-full" onClick={handleLogin}>
                  Login
                  <LogIn className="size-4" />
                </Button>
              </>
            )}
          </div>

          <div className="flex flex-col">
            <SheetClose asChild>
              <Link
                href="/"
                className="flex items-center gap-3 px-5 py-3 text-sm font-medium"
              >
                <Home className="size-4" />
                Início
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/bookings"
                className="flex items-center gap-3 px-5 py-3 text-sm font-medium"
              >
                <CalendarDays className="size-4" />
                Agendamentos
              </Link>
            </SheetClose>
          </div>

          <div className="border-b border-border" />

          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <SheetClose key={category.search} asChild>
                <Link
                  href={`/barbershops?search=${category.search}`}
                  className="px-5 py-3 text-sm font-medium"
                >
                  {category.label}
                </Link>
              </SheetClose>
            ))}
          </div>

          <div className="border-b border-border" />

          {isAuthenticated && (
            <div className="px-5">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                Sair da conta
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
