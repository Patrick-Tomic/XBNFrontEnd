/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
'use client'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function brandPage (req: { params: { id: any } }) {
  const [items, setItems] = useState([])
  useEffect(() => {
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
    const fetchItems = async () => {
      const brandItems = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}brand/${req.params.id}`)
      const data = await brandItems.json()
      const items = data.items
      setItems(items)
    }
    fetchItems() 
  }, [])

  const div = items.map((item: any) => {
    const images = item.images
    return (
      <a key={item.product} href={`/item/${item._id}`}>
            <div className='w-[25vw] bg-white p-3 border-gray-500 border-solid border-2 rounded-xl flex flex-col justify-center items-center'>
            <img className="max-w-[13vw] mb-10" src={`${images[0]}`} alt="" />
            <h2 className='text-2xl font-bold'>{item.product} </h2>
            <p className='text-xl'>{item.price}</p>
            </div>
            </a>
    )
  })

  return (
    <>
    <Header />
          <main className='h-[100%] grid gap-10 grid-cols-3 brandPage'>
          {div}
          </main>
          <Footer />
  </>
  )
}
