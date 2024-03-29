/* eslint-disable import/no-absolute-path */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Image from 'next/image'
import xbn from '/public/xbn.png'
export default async function header () {
  const brandResponse = await fetch('http://localhost:3000/api/brands')
  const data = await brandResponse.json()
  const brands = data.brands 
  const brandListItems = brands.map((brand: any) => {
    return (
            <li key={brand.name} id='brandChild' className="hidden p-5">
                <a href="#">{brand.name}</a>
            </li>
    )
  })
  const categoryResponse = await fetch('http://localhost:3000/api/categories')
  const dataB = await categoryResponse.json()
  const categories = dataB.categories
  const categoryListItems = categories.map((cat: any) => {
    return (
        <li key={cat.type} id='categoryChild' className='p-5 hidden'>
            <a href="#">{cat.type}</a>
        </li>
    )
  })
  return (
        <header className="flex justify-around items-center">
            <a href="#">Home</a>
             <ul id='brandUL'>
                <li id='brandHead'>Shop by Brand</li>
                <div className='absolute'>
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
