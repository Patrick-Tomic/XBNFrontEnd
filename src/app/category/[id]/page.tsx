/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import Header from '@/components/header'
import { useEffect } from 'react'

export default async function categoryPage (req: { params: { id: any } }) {
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
  })
  const categoryItems = await fetch(`http://localhost:3000/api/category/${req.params.id}`)
  const data = await categoryItems.json()
  const items = data.items
  const div = items.map((item: any) => {
    const images = item.images
    return (
            <>
            <a className="flex flex-col justify-between items-center" href={`/item/${item._id}`}>
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
  </>
  )
}
