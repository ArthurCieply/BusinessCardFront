import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import CardDetails from './CardDetails';
import Update from './Update';
import Table from './Table';
import NotFound from './NotFound';
//import axios from 'axios';
import React from 'react';
import { Account } from './components/Accounts';
/*import { Account } from './components/Accounts';
import Signup from './components/SignUp';
import Login from './components/Login';
import Status from './components/Status';
import Settings from './components/Settings';*/
import { Amplify } from 'aws-amplify';
import { withAuthenticator  } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);


function App({ signOut, user }) {
  /*const title = 'Welcome to the Business Cards App!';*/

  /*const session = cognitoUser.getSession();*/

  return (

    /*<Account>
      <Status />
      <Signup />
      <Login />
      <Settings />
    </Account>*/


    <Router>
      <Account>
        <div className="App">
          <Navbar />
          {/*<Navbar><button onClick={signOut}>Sign out</button>
                <h3>Hello {user.username}</h3></Navbar>*/}
          <div className="content">
            <Switch>
              <Route exact path="/BusinessCardFront/">
                <Home />
              </Route>
              <Route path="/BusinessCardFront/table">
                <Table />
              </Route>
              <Route path="/BusinessCardFront/create">
                <Create />
              </Route>
              <Route path="/BusinessCardFront/cards/:id/:sort">
                <CardDetails />
              </Route>
              <Route exact path="/BusinessCardFront/update/:id/:sort">
                <Update />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Account>
    </Router>
  );
}

export default withAuthenticator(App);
