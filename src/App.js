import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import CardDetails from './CardDetails';
import Update from './Update';
import NotFound from './NotFound';
import axios from 'axios';


function App() {
  const title = 'Welcome to the Business Cards App!';

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/cards/:id">
              <CardDetails />
            </Route>
            <Route exact path="/update/:id">
              <Update />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>  
  );
}

export default App;
