import React, { useContext, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { Login } from "./accountBox/Login";
import ProductContainer from './products/ProductContainer'
import About from "../pages/About";
import Footer from "./Footer";
import Product from "./products/Product";
import ReviewsList from './reviews/ReviewsList'
import NewProduct from "./products/NewProduct";
import Notification from '../pages/Notification'
import { UserContext } from "./context/user";
import Review from "./reviews/ReviewCard";


function App() {
  const { user, setUser, onLogin } = useContext(UserContext)

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      }
    });
  }, [setUser]);

  // if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar />
      <Notification />
      <main>
        <Switch>
          <Route path="/products/new">
            <NewProduct user={user}/>
          </Route>
          <Route path="/products/:id/reviews">
            <ReviewsList user={user}/>
          </Route>
          <Route path="/reviews/:reviewId">
            <Review user={user}/>
          </Route>
          <Route path="/products/:productId">
            <Product user={user}/>
          </Route>
          <Route path="/products">
            <ProductContainer user={user}/>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/account">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
