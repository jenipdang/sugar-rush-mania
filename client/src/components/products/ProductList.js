import Product from './Product'

const ProductList = ({products}) => {

    const displayProducts = products?.map((product) => (
        <Product key={product.id} product={product} />
    ))
  
  return (
    <div>
        {displayProducts}
    </div>
  )
}

export default ProductList