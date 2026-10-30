import type { Product } from '../productsSlice'

function ProductRow({ id, title, category, price, image }: Product) {
  return (
    <div
      key={id}
      className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-gray-50"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 p-1">
        <img src={image} alt={title} className="h-full w-full object-contain" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-medium text-gray-800">
          {title}
        </p>
        <span className="mt-1 inline-block rounded-full bg-[#F1F6EF] px-2 py-0.5 text-xs capitalize text-[#5E7F5B]">
          {category}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-800">${price}</p>
    </div>
  )
}

export default ProductRow
