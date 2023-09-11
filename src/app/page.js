import ClientComponentsWrapper from './components/ClientComponentsWrapper'
import { Ubuntu, Figtree } from 'next/font/google'

// Use for headings
export const ubuntu = Ubuntu({ 
  weight: ['300', '500'],
  subsets: ['latin'],
  variable: '--font-ubuntu',
})

// Use for body
export const figtree = Figtree({ 
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-figtree',
})

export default function Home() {

  return (
    <main className={`${figtree.variable} ${ubuntu.variable}`}>
      <h1>ForeFlight Flight Conditions</h1>
      <ClientComponentsWrapper />
    </main>
  )
}
