/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable import/no-absolute-path */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Image from 'next/image'
import { useEffect } from 'react'
import xbn from '/public/xbn.png'
export default async function Header () {
  const brandResponse = await fetch('http://localhost:3000/api/brands')
  const data = await brandResponse.json()
  const brands = data.brands

  const categoryResponse = await fetch('http://localhost:3000/api/categories')
  const dataB = await categoryResponse.json()
  const categories = dataB.categories

  const categoryListItems = categories.map((cat: any) => {
    return (
        <li key={cat.type} id='categoryChild' className='p-5 hidden'>
            <button onClick={() => {
              window.location.href = `/category/${cat._id}`
            }}>
              {cat.type}
            </button>
        </li>
    )
  })

  const brandListItems = brands.map((brand: any) => {
    return (
     <li key={brand._id} id='brandChild' className="hidden p-5">
             {/*  <a href={`/brand/${brand._id}`}> {brand.name}</a> */}
             <button onClick={() => {
               window.location.href = `/brands/${brand._id}`
             }}>{brand.name}</button>
          </li>
    )
  })
  return (
        <header className="flex justify-around items-center">
            <a href="#">Home</a>
             <ul id='brandUL'>
                <li id='brandHead'>Shop by Brand</li>
                <div className='brandDiv absolute'>
                {brandListItems}
                </div>
             </ul>
             <Image className="w-[12vw] h-[18vh]"
              src={xbn} alt={''} />
             <ul id='catUL'>
                <li id='categoryHead'>Shop by Category</li>
                <div className='absolute catDiv'>
                {categoryListItems}
                </div>
             </ul>
             <a href="#">Contact Us</a>
        </header>
  )
}
