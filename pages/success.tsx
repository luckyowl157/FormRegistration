import Head from 'next/head'
import { Inter } from 'next/font/google'
import ThankYou from '@/components/ThankYou/ThankYou'

//json
import data from '../public/data/thankyou.json'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main>
        <ThankYou data={data} />
      </main>
    </>
  )
}
