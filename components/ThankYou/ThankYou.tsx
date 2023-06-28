import Link from 'next/link'

import s from './ThankYou.module.sass'

interface props {
  data: {
    title: string,
    text: string,
    button: {
      text: string,
      href: string
    }
  }
}

export default function ThankYou({ data }: props) {

  const title = data.title
  const text = data.text
  const btn = data.button

  return <section className={s.section}>
    <h1>{title}</h1>
    <p>{text}</p>
    <Link
      href={btn.href}
    >{btn.text}</Link>
  </section>
};
