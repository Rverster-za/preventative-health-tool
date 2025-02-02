import './globals.css'

export const metadata = {
  title: 'Preventative Health Tool',
  description: 'Health screening and prevention recommendations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
