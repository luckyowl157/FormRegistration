import Head from 'next/head'
import { Inter } from 'next/font/google'
import ThankYou from '@/components/ThankYou/ThankYou'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      
      <main>
        {/* <Form /> */}
        <ThankYou />
      </main>
    </>
  )
}
