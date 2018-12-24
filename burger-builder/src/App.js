import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;