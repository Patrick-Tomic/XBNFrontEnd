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
    document.getElementById('leftBtn')?.addEventListener('click', () => {
      const vw = 25
      const imgs = document.getElementById('productImg')

    })
  }, [])
  const item = await fetch(`http://localhost:3000/api/product/${req.params.id}`)
  const data = await item.json()
  const product = data.product
  const imgs = product.images
  const flavors = product.flavors
  const productImg = (
    <div id='productImg' className='flex w-[25vw] overflow-hidden'>
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
        <main className='itemDetail h-[100%] bg-[F6E4C8] items-center flex flex-col  ' suppressHydrationWarning={true}>
            <div className='flex rounded-xl h-[100vh]  w-[85%] p-16 justify-around bg-[#FAF9F6]' suppressHydrationWarning={true}>
            <div className='flex justify-around items-center  w-[45vw]'>
                <button id='leftBtn'>
                    left
                </button>
                <div>
                {productImg}
                <div>
                </div>
                </div>
                <button id='rightBtn'>
                    right
                </button>
             </div>
              <div className='flex  items-center justify-between flex-col' id='rightItemDesc' suppressHydrationWarning={true} >
                <div>
              <h1 className='text-3xl font-bold mb-5'>{product.brand.name} - {product.product}</h1>
                <p className='text-2xl' suppressHydrationWarning={true}>
                    ${product.price}
                </p>
                </div>
                <div className='flex justify-center items-center'>
                  <h3 className='text-3xl'>Flavors:</h3>
                <select className='w-[80%] text-3xl' name="flavor" id="">
                  {flavorOptions }
                </select>
                </div>
                 <button id='addToCart' className='w-[90%] h-[5vh] border-solid rounded-xl border-black border-2 text-4xl'>Add to Cart</button>
                <p className='w-[20vw] text-xl leading-loose'>
                  {product.summary}
                </p>
              </div>
            </div>
        </main>
        </>
  )
}
