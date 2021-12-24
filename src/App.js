import React, { useState, useCallback } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Auth } from "./components/Auth"
import CreateUser from "./components/CreateUser";

import Login from "./components/Login"
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let route;
  if (isLoggedIn) {
    route = (
      <Switch>
        <Route exact path="/" component={() => (<Login user={user} updateUser={updateUser} />)}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    route = (
      <Switch>
        <Route exact path="/" component={() => (<Login user={user} updateUser={updateUser} />)}></Route>
        <Route path="/create" component={CreateUser}></Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  const updateUser = useCallback((newUser) => {
    setUser(newUser);
    if (newUser) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])


  const logout = useCallback(
    () => {
      localStorage.removeItem("user")
      setIsLoggedIn(false)
    }, [])



  return (

    <Auth.Provider value={{ isLoggedIn: isLoggedIn, logout: logout, updateUser: updateUser }}>

      <div>
        <BrowserRouter>
         {/* <BrowserRouter history={history}> */}
          <div style={{ marginLeft: "12px" }}>
            {route}
          </div>
        </BrowserRouter>
      </div>
    </Auth.Provider>
  );
}
export default App;
