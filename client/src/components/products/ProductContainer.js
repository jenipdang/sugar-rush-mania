import {useState, useEffect } from 'react'
import ProductList from './ProductList'
import Search from './Search'
import Filter from './Filter'

const ProductContainer = () => {
    const [products, setProducts ] = useState([])
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const allCategories = ['All', ...new Set(products.map((product) => product.category))]
    console.log(allCategories)


    useEffect(() => {
        fetch('/api/products')
        .then((r) => r.json())
        .then((data) => {
            setProducts(data)
        })
        .catch((err) => alert(err.errors))
    }, [])

    const filterProducts = (category) => {
      if (category === 'All') {
        setSearchResult(products);
        return;
      }
      const newProducts = products.filter((product) => product.category === category)
      setSearchResult(newProducts);
    };
  
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
      	<header className='blog-header py-3'>
					<div className='row flex-nowrap justify-content-between align-items-center'>
						{/* <div className='col-4 text-center'>
							<h3>Sugar Rush Mania</h3>
						</div> */}
						<div className='col-4 d-flex justify-content-end align-items-center'>
							<Search products={products} term={search} searchKeyword={searchHandler}/>
						</div>
					</div>
				</header>
			  <Filter categories={allCategories} filterProducts={filterProducts}/>
        <ProductList products={searchResult} />
    </div>
  )
}

export default ProductContainer