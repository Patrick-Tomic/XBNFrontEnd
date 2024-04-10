'use client'
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Header from '@/components/header'
import { useEffect } from 'react'
export default async function itemDetail (req: { params: { id: any } }) {
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
  }, [])
  const item = await fetch(`http://localhost:3000/api/product/${req.params.id}`)
  const data = await item.json()
  const product = data.product
  const imgs = product.images
  console.log(product)
  const flavors = product.flavors
  const productImg = (
    <div id='productImg' className='flex w-[15vw] overflow-hidden'>
      <img src={imgs[0]} alt="" />
      <img src={imgs[imgs.length - 1]} alt="" />
    </div>
  )
  const flavorOptions = flavors.length > 0
    ? flavors.map((flavor: any) => {
      return (
      <option key ={flavor} value={`${flavor}`}>{flavor}</option>
      )
    })
    : ''
  return (
        <>
        <Header />
        <main className='m-10 h-[100%]  items-center flex flex-col border-solid border-black border-2 ' suppressHydrationWarning={true}>
            <h1 className='text-3xl font-bold mb-20'>{product.product}</h1>
            <div className='flex border-2 border-solid border-black w-[75%] p-16 justify-around' suppressHydrationWarning={true}>
            <div className='flex justify-around border-2 border-black border-solid w-[25vw]'>
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
              <div className='flex items-center flex-col' id='rightItemDesc' suppressHydrationWarning={true} >
                <div className='flex'>
                <p className='font-bold text-xl' suppressHydrationWarning={true}>
                    ${product.price}
                </p>
                <select name="flavor" id="">
                  {flavorOptions }
                </select>
                </div>

                <p className='w-[20vw] text-lg'>
                  {product.summary}
                </p>
              </div>
            </div>
        </main>
        </>
  )
}
