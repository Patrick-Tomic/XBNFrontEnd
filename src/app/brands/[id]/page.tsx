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
            <div className='w-[25vw] p-3 border-gray-500 border-solid border-2 rounded-xl flex flex-col justify-center items-center'>
            <img className="max-w-[13vw] mb-10" src={`${images[0]}`} alt="" />
            <h2 className='text-2xl font-bold'>{item.product} </h2>
            </div>
            </>
    )
  })

  return (
    <>
    <Header />
        <div className=' m-10 grid gap-10 grid-cols-3'>
            {div}
        </div>
  </>
  )
}
