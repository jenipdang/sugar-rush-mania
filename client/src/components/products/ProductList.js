import Product from './Product'

const ProductList = ({products, addToCart}) => {

    const displayProducts = products?.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart}/>
    ))
  
  return (
    <div>
        {displayProducts}
    </div>
  )
}

export default ProductList