import Product from './Product'

const ProductList = ({products, onAdd}) => {

    const displayProducts = products?.map((product) => (
        <Product key={product.id} product={product} onAdd={onAdd}/>
    ))
  
  return (
    <div>
        {displayProducts}
    </div>
  )
}

export default ProductList