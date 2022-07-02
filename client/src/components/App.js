import React, { useContext, useEffect} from "react";
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


function App() {
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      }
    });
  }, [setUser]);
  

  return (
    <>
      <NavBar />
      <Notification />
        <Switch>
          <Route path="/profile">
            <Profile />
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
            <Product />
          </Route>
          <Route path="/products">
            <ProductContainer />
          </Route>
          <Route path="/cart">
            <Cart />
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
