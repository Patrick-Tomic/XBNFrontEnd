'use client'
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Header from '@/components/header'
import Image from 'next/image'

export default async function itemDetail (req: { params: { id: any } }) {
  const item = await fetch(`http://localhost:3000/api/product/${req.params.id}`)
  const data = await item.json()
  const product = data.product
  const imgs = product.images
  const productImg = (
    <div id='productImg' className='flex w-[20vw] overflow-hidden'>
      <img src={imgs[0]} alt="" />
      <img src={imgs[imgs.length - 1]} alt="" />
    </div>
  )
  return (
        <>
        <Header />
        <main className='m-10 h-[100%]  items-center flex flex-col border-solid border-black border-2 '>
            <h1 className='text-3xl font-bold mb-20'>{product.product}</h1>
            <div>
            <div className='flex'>
                <button>
                    left
                </button>
                <div>
                {productImg}
                <div>
                </div>
                </div>
                <button>
                    right
                </button>
            </div>
            <div id='rightItemDesc'>
                <h3>
                    {product.price}
                </h3>
            </div>
            </div>
        </main>
        </>
  )
}
