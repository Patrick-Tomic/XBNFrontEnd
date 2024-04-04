'use server'

// eslint-disable-next-line @typescript-eslint/no-unused-expressions

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function brandPage (req: { params: { id: any } }) {
  const brandItems = await fetch(`http://localhost:3000/api/brand/${req.params.id}`)
  const data = await brandItems.json()
  const items = data.items
  const div = items.map((item: any) => {
    return (
            <>
            <p>{item.product}</p>
            </>
    )
  })
  console.log(items)
  return (
        <div>
            {div}
        </div>
  )
}
