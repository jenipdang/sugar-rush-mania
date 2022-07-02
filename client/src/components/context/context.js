import React , { useState, useEffect, useContext } from 'react';

const DataContext = React.createContext()


const DataProvider = ({children}) => {
    const [cart, setCart] = useState([])
	const [product, setProduct] = useState([])

	
	const getProduct = async (id) => {
		try {
			const response = await fetch('/api/products');
			const data = await response.json();
			setProduct(data)
		} catch (error) {
			alert (error)
		}
	}
	
	
	useEffect(() => {
		getProduct()
	}, [])
	
	
    const addItem = (product) => {
		const existing = cart.find(item => item.id === product.id)
		if (existing) {
			setCart(cart.map(item => item.id === product.id ? {...existing, qty: existing.qty + 1 } : item ))
		}
		else {
			setCart([...cart, {...product, qty: 1 }])
		}
	}

    const removeItem = (product) => { 
		const existing = cart.find(item => item.id === product.id)
		if (existing.qty === 1) {
			setCart(cart.filter(item => item.id !== product.id))
		} else {
			setCart(cart.map(item => item.id === product.id ? {...existing, qty: existing.qty - 1 } : item))
		}
	}

  return (
      <div>
          <DataContext.Provider value={{setCart, cart, product, addItem, removeItem}}>
              {children}
          </DataContext.Provider>
      </div>
  )
};

export const useGlobalContext = () =>  {
	return useContext(DataContext)
}
 
export {DataProvider, DataContext};