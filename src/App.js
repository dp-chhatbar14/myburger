import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import SignUp from './containers/SignUp'
import SignIn from './containers/SignIn'
import Checkout from './containers/Ckeckout/Checkout';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

import './App.css';

class App extends Component {
  render(){
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path='/' exact component={SignIn}/>
              <Route path='/signup' exact component={SignUp}/>  
              <Route path='/builder' exact component={BurgerBuilder}/>
              <Route path='/orders' exact component={Orders}/>
              <Route path='/checkout' component={Checkout}/>
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
