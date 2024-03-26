/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Image from 'next/image'
import xbn from '../xbn.png'
export default function Header () {
  const object: any = getItems()

  console.log(object.brands)
  /* const brandListItems = names.map((brand: any) => {
    return (
        <li>
            <a href="#">{brand.name}</a>
        </li>
    )
  }) */
  return (
        <header className="flex">
            a
        </header>
  )
}

async function getItems () {
  try {
    const response = await fetch('http://localhost:3000/api/brands')
    const data = await response.json()
    const brands = await data.brands
    const names = brands.map((brand: any) => { return brand.name })
    const responseB = await fetch('http://localhost:3000/api/categories')
    const dataB = await responseB.json()
    const categories = dataB.map((category: any) => { return category.type })
    return {
      brands: names,
      categories
    }
  } catch (err) {
    return err
  }
}
