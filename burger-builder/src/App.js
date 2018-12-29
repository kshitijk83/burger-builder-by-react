import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder />:null
        </Layout>
      </div>
    );
  }
}

export default App;