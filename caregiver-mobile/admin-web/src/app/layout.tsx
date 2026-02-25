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
      <body className="bg-[#faf9f7] font-[var(--font-dm)] min-h-screen antialiased">
        
        {/* 🔹 Navbar */}
        <nav className="w-full border-b bg-white px-4 sm:px-6 md:px-8 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          
          <h1 className="text-base sm:text-lg md:text-xl font-semibold font-[var(--font-playfair)]">
            Dashboard
          </h1>

          <div className="flex gap-4 sm:gap-6 text-sm md:text-base">
            <Link href="/" className="hover:opacity-70 transition">
              Home
            </Link>
            {/* 
            <Link href="/non-compliant" className="hover:opacity-70 transition">
              Non-Compliant
            </Link> 
            */}
          </div>
        </nav>

        {/* 🔹 Page Content */}
        <div className="px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto py-6 sm:py-8">
          {children}
        </div>

      </body>
    </html>
  )
}