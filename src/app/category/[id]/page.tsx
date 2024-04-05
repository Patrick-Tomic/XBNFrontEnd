/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import Header from '@/components/header'

export default async function categoryPage (req: { params: { id: any } }) {
  const categoryItems = await fetch(`http://localhost:3000/api/category/${req.params.id}`)
  const data = await categoryItems.json()
  const items = data.items
  const div = items.map((item: any) => {
    const images = item.images
    return (
            <>
            <div className="flex flex-col justify-between items-center">
                <img src={`${images[0]}`} alt="" />
                <h2>{item.product}</h2>
                <p>{item.summary}</p>
            </div>
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
