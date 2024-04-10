/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default async function item (id: any) {
  const item = await fetch(`http://localhost:3000/api/product/${id}`)
  const data = await item.json()
  const product = data.product
  return product
}
