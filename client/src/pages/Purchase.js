import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import Cart from '../components/Cart';
import Footer from '../components/Footer';

class Purchase extends Component {
  render() {
    return (
        <div className="App">
          <AppNavbar />
          <Cart />
          <Footer />
        </div>
    );
  }
}

export default Purchase;
