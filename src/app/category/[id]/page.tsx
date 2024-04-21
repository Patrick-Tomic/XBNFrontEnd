/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { useEffect, useState } from 'react'

export default function categoryPage (req: { params: { id: any } }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    (async () => {
      const categoryItems = await fetch(`{process.env.NEXT_PUBLIC_backend_Link}category/${req.params.id}`)
      const data = await categoryItems.json()
      const items = data.items
      setItems(items)
      return
    })()
    document.getElementById('brandHead')?.addEventListener('mouseover', () => {
      document.querySelectorAll('#brandChild').forEach((child) => {
        child.setAttribute('style', 'display:block;')
      })
    })

    document.getElementById('categoryHead')?.addEventListener('mouseover', () => {
      document.querySelectorAll('#categoryChild').forEach((child) => {
        child.setAttribute('style', 'display:block')
      })
    })
    document.getElementById('catUL')?.addEventListener('mouseleave', () => {
      document.querySelectorAll('#categoryChild').forEach((child) => {
        child.setAttribute('style', 'display:hidden')
      })
    })

    document.getElementById('brandUL')?.addEventListener('mouseleave', () => {
      document.querySelectorAll('#brandChild').forEach((child) => {
        child.setAttribute('style', 'display:hidden')
      })
    })
  }, [])
  const div = items.map((item: any) => {
    const images = item.images
    return (
            <>
            <a className="flex flex-col justify-between items-center" key={item.product} href={`/item/${item._id}`}>
                <img src={`${images[0]}`} alt="" />
                <h2>{item.product}</h2>
                <p>{item.summary}</p>
            </a>
            </>
    )
  })
  return (
    <>
    <Header />
    <main>
        {div}
    </main>
    <Footer />
  </>
  )
}
