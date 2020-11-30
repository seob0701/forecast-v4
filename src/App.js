import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Nav, About, Board, Login, Register, Home, Write ,View, Error} from "./pages/index";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [loggedStatus, setLoggedStatus] = useState(false);
  const _login = () => {
    Axios.get("http://localhost:3001/login").then((response) => {
      setLoggedStatus(response.data.loggedIn);
    });
  };

  useEffect(() => {
    _login();
    // console.log(userInfo);
  }, []);

  const RouteIf = ({ role, component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          /* 권한이 없을 경우 */
          if (role === false) {
            return <Login />;
          }

          /* 권한이 있을 경우 */
          if (Component) {
            return <Component {...props} />;
          }

          return null;
        }}
      />
    );
  };

  return (
    <div className="App">
      <Nav />
      <Switch>
      <RouteIf path="/" exact component={Home} role={loggedStatus} />
        <Route path="/about" component={About} />
        <Route path="/board" component={Board} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/view" component={View} />
        {/* <Route path="/write" component={Write} /> */}
        <RouteIf path="/write" exact component={Write} role={loggedStatus} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
