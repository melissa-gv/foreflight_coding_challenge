import './globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export const metadata = {
  title: 'ForeFlight - Flight Conditions',
  description: 'Foreflight coding challenge. Code developed by Melissa Gil',
  icons: {
    icon: '/ForeFlight-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
