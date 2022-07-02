import {useState, useEffect } from 'react'
import ProductList from './ProductList'

const ProductContainer = () => {
    const [products, setProducts ] = useState([])

    useEffect(() => {
        fetch('/api/products')
        .then((r) => r.json())
        .then((data) => {
            setProducts(data)
        })
        .catch((err) => alert(err.errors))
    }, [])

  return (
    <div className='container'>
        <ProductList products={products} />
    </div>
  )
}

export default ProductContainer