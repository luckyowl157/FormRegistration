import ThankYou from '@/components/ThankYou/ThankYou'

//json
import data from '../public/data/thankyou.json'

export default function Home() {
  return (
    <>
      <title>Thank You</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <main>
        <ThankYou data={data} />
      </main>
    </>
  )
}
