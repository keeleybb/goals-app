import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pomodor from "./pages/Pomodor";
import Calendar from "./components/Calendar";
import SignUpLogin from "./components/Login";
import NoMatch from "./pages/NoMatch";
import Goals from "./pages/Goals";
import Nav from "./components/Nav";
import Soul from "./pages/Soul";
import userContext from './utils/userContext';
import API from './utils/API';

function App() {
  const [user, setUser] = useState();
  const [goals, setGoals] = useState([{ goal: '', Tasks: [] }])

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    API.status()
      .then(res => {
        if (res.data.user) {
          console.log("who are you?", res.data.user)
          setIsLoggedIn(true);
        }
      })
      .catch(e => {
        console.log('error', e)
      })
  })
  return (
    <Router>
      <userContext.Provider value={{ user: user, setUser: setUser, setGoals: setGoals, goals: goals }}>
        {/* // @Keeley - This is where we tie user and goal I think... ^^^ */}
        <Nav isLoggedIn={isLoggedIn} />
        <div className="page">
          <Switch>
            <Route exact path={["/", "/signup"]}>
              <SignUpLogin isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/pomodor">
              <Pomodor isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/goals">
              <Goals isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/calendar">
              <Calendar isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/mysoul">
              <Soul isLoggedIn={isLoggedIn} />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </userContext.Provider>
    </Router>
  );
}

export default App;
