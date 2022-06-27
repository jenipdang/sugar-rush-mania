import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { AccountBox } from "./accountBox/Login";
import ProductContainer from './products/ProductContainer'
import About from "../pages/About";
import Footer from "./Footer";


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

  if (!user) return <AccountBox onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          {/* <Route path="/new">
            <NewRecipe user={user} />
          </Route> */}
          <Route path="/products">
            <ProductContainer />
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
