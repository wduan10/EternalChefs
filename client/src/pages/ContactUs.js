import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer.js';
import Contact from '../components/ContactUs.js';

class ContactUs extends Component {
  render() {
    return (
        <div className="App">
            <AppNavbar />
            <Contact />
            <Footer />
        </div>
    );
  }
}

export default ContactUs;
