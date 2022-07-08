import { useContext, useEffect, useState} from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import { Login } from "./accountBox/Login";
import ProductContainer from './products/ProductContainer'
import About from "./pages/About";
import Footer from "./pages/Footer";
import Product from "./products/Product";
import ReviewsList from './reviews/ReviewsList'
import NewProduct from "./products/NewProduct";
import Notification from './pages/Notification'
import Review from "./reviews/ReviewCard";
import { UserContext } from "./context/user";
import Profile from "./pages/Profile";
import Cart from './pages/Cart'
import FeatureProduct from "./pages/FeatureProduct";
import EventForm from "./pages/EventForm";
import { MessageContext } from "./context/message";
import { CartContext } from "./context/cart";



function App() {
  const { user, setUser } = useContext(UserContext)
  const { cart, setCart } = useContext(CartContext)
  const [errors, setErrors] = useState([])
  const [products, setProducts] = useState([])
  const { setMessage } = useContext(MessageContext)

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      }
    });
  }, [setUser]);


  useEffect(() => {
    fetch('/api/products')
    .then((r) => r.json())
    .then((data) => {
        setProducts(data)
    })
    .catch((err) => setErrors(err.errors))
}, [])


useEffect(() => {
  if(user) {
    fetch(`/api/users/${user.id}/cart_products`)
      .then((r) => r.json())
      .then((cart_products) => {
        setCart(cart_products)
      })
      .catch((err) => setErrors(err.errors))
  }
}, [user])

console.log(cart)


  function addToCart(product) {
		fetch(`/api/users/${user.id}/cart_products?product_id=${product.id}`, {
			method: "POST",
			headers: { "Content-Type": "applicaiton/json"},
			body: JSON.stringify({
				product_id: product.id,
				user_id: user.id,
				quantity: 1
			})
		}).then((r) => {
			if (r.ok) {
				r.json().then((cart_products) => {
          setCart(cart_products)
          setMessage({message: "Succesfully add to cart", color: "green"})
        })
			}
			else {
				r.json().then((err) => setErrors(err.errors))
			}
		})
	}

  function deleteFromCart(id) { 
		fetch(`/api/cart_products/${id}`, {
			method: "DELETE"
		}).then((r) => {
			if (r.ok) {
				setCart([...cart].filter((product) => product.product_id !== id))
			} else {
				r.json().then((err) => setErrors(err.errors))
			}
		})
    .catch((err) => setErrors((err.errors)))
	}
  
  return (
    <>
      <NavBar cart={cart}/>
      <Notification />
        <Switch>
          <Route path="/home">
            <FeatureProduct />
          </Route>
          <Route path="/products/new">
            <NewProduct />
          </Route>
          <Route path="/products/:id/reviews">
            <ReviewsList />
          </Route>
          <Route path="/reviews/:reviewId">
            <Review />
          </Route>
          <Route path="/products/:productId">
            <Product onAdd={addToCart}/>
          </Route>
          <Route path="/products">
            <ProductContainer onAdd={addToCart} />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/cart">
            <Cart onAdd={addToCart} onRemove={deleteFromCart} products={products}/>
          </Route>
          <Route path="/event/new">
            <EventForm user={user} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/account">
            <Login />
          </Route>
        </Switch>
      <Footer />
    </>
  );
}

export default App;
