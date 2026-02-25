import './globals.css'
import Link from 'next/link'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${mono.variable}`}
    >
      <body className="bg-[#faf9f7] font-[var(--font-dm)] min-h-screen antialiased overflow-x-hidden">

        {/* 🔹 Navbar */}
        <nav className="w-full border-b bg-white">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
            
            <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              
              {/* Title */}
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold font-[var(--font-playfair)] leading-tight">
                Dashboard
              </h1>

              {/* Navigation Links */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base">
                <Link
                  href="/"
                  className="hover:opacity-70 transition whitespace-nowrap"
                >
                  Home
                </Link>

                {/*
                <Link
                  href="/non-compliant"
                  className="hover:opacity-70 transition whitespace-nowrap"
                >
                  Non-Compliant
                </Link>
                */}
              </div>

            </div>
          </div>
        </nav>

        {/* 🔹 Page Content */}
        <main className="flex-1">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
            {children}
          </div>
        </main>

      </body>
    </html>
  )
}