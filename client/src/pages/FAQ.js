import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar'
import FAQSection from '../components/FAQSection.js';
import Footer from '../components/Footer.js';

class FAQ extends Component {
  render() {
    return (
        <div className="App">
            <AppNavbar />
            <FAQSection />
            <Footer />
        </div>
    );
  }
}

export default FAQ;