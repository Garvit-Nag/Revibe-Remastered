// app/layout.tsx
"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Revibe - Discover your next favorite song</title>
        <meta name="description" content="Discover your next favorite song" />
      </head>
      <body className={`${inter.className} bg-background text-text-primary min-h-screen`}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}
