import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { Login } from "./accountBox/Login";
import ProductContainer from './products/ProductContainer'
import About from "../pages/About";
import Footer from "./Footer";
import Product from "./products/Product";
import ReviewsList from './reviews/ReviewsList'
import NewProduct from "./products/NewProduct";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/products/new">
            <NewProduct user={user}/>
          </Route>
          <Route path="/products/:id/reviews">
            <ReviewsList user={user}/>
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
          {/* <Route path="/account">
            <AccountBox />
          </Route> */}
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;