import './globals.css'

export const metadata = {
  title: 'AI Portfolio Showcase',
    description: 'Web apps built with AI',
    }

    export default function RootLayout({ children }) {
      return (
          <html lang="en">
                <body>{children}</body>
                    </html>
                      )
                      }