import {useState, useEffect } from 'react'
import ProductList from './ProductList'
import Search from './Search'
import Filter from './Filter'
import { useContext } from 'react'
import { MessageContext } from '../context/message'
import useWindowSize from '../hooks/useWindowSize'

const ProductContainer = ({onAdd, prods}) => {
    const [products, setProducts ] = useState([])
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const { setMessage } = useContext(MessageContext)
    const isMobile = useWindowSize()

  
    useEffect(() => {
        if(!prods) {
          fetch('/api/products')
          .then((r) => r.json())
          .then((data) => {
              setProducts(data)
              setSearchResult(data)
          })
          .catch((err) => setMessage({message: err.errors, color: 'red'}))
        }
    }, [prods, setMessage])

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
      {isMobile.width < 760 ? null : <>
      	<header className='blog-header position-fixed'>
					<div className='row flex-nowrap justify-content-between align-items-center'>
						<div className='col-6 text-center'>
			        <Filter categories={allCategories} filterProducts={filterProducts}/>
							<Search products={products} term={search} searchKeyword={searchHandler}/>
						</div>
					</div>
				</header>
      </>}
        <ProductList products={searchResult} onAdd={onAdd}/>
    </div>
  )
}

export default ProductContainer