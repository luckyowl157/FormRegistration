import Head from 'next/head'
import { Inter } from 'next/font/google'
import Form from '../components/Form/Form'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      
      <main>
        {/* <Form /> */}
        <h1>Welcome to homepage</h1>
      </main>
    </>
  )
}
