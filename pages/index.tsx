//components
import Form from '@/components/Form/Form'

// data
import data from '@/public/data/formData.json'

export default function Home() {

  return (
    <>
      <title>Registration</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <main>
        <Form data={data} />
      </main>
    </>
  )
}
