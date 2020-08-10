import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import Section1 from '../components/Section1';
import Section2 from '../components/Section2';
import Section2Header from '../components/Section2Header';
import Section3 from '../components/Section3';
import Footer from '../components/Footer';

class Home extends Component {
  render() {
    return (
        <div className="App">
            <AppNavbar />
            <Section1 />
            <Section2Header />
            <Section2 />
            <Section3 />
            <Footer />
        </div>
    );
  }
}

export default Home;
