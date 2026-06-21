import { Navbar } from '@/components/layout/Navbar'
import { SkyBackground } from '@/components/effects/SkyBackground'
import { DeveloperConsole } from '@/components/effects/DeveloperConsole'
import OnekoCompanion from '@/components/OnekoCompanion'
import { PageTransition } from '@/components/layout/PageTransition'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        
      </head>
      <body suppressHydrationWarning>
        <DeveloperConsole />
        <SkyBackground />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <OnekoCompanion />
      </body>
    </html>
  )
}
