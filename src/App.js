import React from 'react';

import './App.css';
import Layout from './components/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <Layout>
      <div>
        <BurgerBuilder />
      </div>
    </Layout>
  );
}

export default App;
