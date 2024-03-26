/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Image from 'next/image'
import xbn from '../xbn.png'
interface Brands {
  _id: string
  name: string
}
export default async function Header () {    
    const response = await fetch('http://localhost:3000/api/brands')
    const data = await response.json()
    const brands = data.brands
    const brandListItems = brands.map((brand: any) => {
        return ( 
            <li>
                {brand.name}
            </li>
        )
    })
    
  return (
        <header className="flex">
            {brandListItems}
        </header>
  )
}
