'use client'
import React, { useEffect } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const link: HTMLLinkElement =
      document.querySelector("#dynamic-favicon") || document.createElement('link');

    link.id = 'dynamic-favicon';
    link.rel = 'icon';

    link.href = isDarkMode ? '/favicon-light.ico' : '/favicon-dark.ico';

    document.head.appendChild(link);
  }, []);
  return (
    <html lang="pt">
      <title>JSON Tree Viewer</title>
      <body className={inter.className}>{children}
      </body>
    </html>
  )
}
