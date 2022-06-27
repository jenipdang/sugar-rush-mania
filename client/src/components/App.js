import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { AccountBox } from "./accountBox/Login";
// import RecipeList from "../pages/RecipeList";
// import NewRecipe from "../pages/NewRecipe";


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
          </Route>
          <Route path="/">
            <RecipeList />
          </Route> */}
          {/* <Route path="/account">
            <AccountBox />
          </Route> */}
        </Switch>
      </main>
    </>
  );
}

export default App;
