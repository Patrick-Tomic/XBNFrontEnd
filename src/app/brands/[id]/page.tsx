// eslint-disable-next-line @typescript-eslint/no-unused-expressions
'use client'
import Header from '@/components/header'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function brandPage (req: { params: { id: any } }) {
  const brandItems = await fetch(`http://localhost:3000/api/brand/${req.params.id}`)
  const data = await brandItems.json()
  const items = data.items
  const div = items.map((item: any) => {
    const images = item.images
    return (
      <>
            <div>
            <img className="w-[15vw]" src={`${images[0]}`} alt="" />
            <h2>{item.product} </h2>
            </div>
            </>
    )
  })

  return (
    <>
    <Header />
        <div>
            {div}
        </div>
  </>
  )
}
