import {useState, useEffect } from 'react'
import ProductList from './ProductList'
import Search from './Search'
import Filter from './Filter'

const ProductContainer = ({onAdd, prods}) => {
    const [products, setProducts ] = useState([])
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [errors, setErrors] = useState([])

  
    useEffect(() => {
        if(!prods) {
          fetch('/api/products')
          .then((r) => r.json())
          .then((data) => {
              setProducts(data)
              setSearchResult(data)
          })
          .catch((err) => setErrors(err.errors))
        }
    }, [prods])

    const filterProducts = (categoryItem) => {
      if (categoryItem === 'All') {
        setSearchResult(products);
        return;
      }
      const result = products?.filter((currentData) => {
        return currentData.category === categoryItem;
      });
      setSearchResult(result);
    };

    const allCategories = ["All",...new Set(products?.map((product) => product.category))]
    
    const searchHandler = (search) => {
          setSearch(search)
      if (search !== '') {
        const newProduct = searchResult.filter((product) => {
          return Object.values(product)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase());
        });
              setSearchResult(newProduct)
      } else {
              setSearchResult(products)
          }
    };

 
  return (
    <div className='container'>
      	<header className='blog-header position-fixed'>
					<div className='row flex-nowrap justify-content-between align-items-center'>
						<div className='col-6 text-center'>
			        <Filter categories={allCategories} filterProducts={filterProducts}/>
							<Search products={products} term={search} searchKeyword={searchHandler}/>
						</div>
					</div>
				</header>
        <ProductList products={searchResult} onAdd={onAdd}/>
    </div>
  )
}

export default ProductContainer