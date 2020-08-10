import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Instagram from '../images/Instagram.png';
import Twitter from '../images/Twitter.png';
import Profile from '../images/profile.png';
import LoginModal from './LoginModal';
import SuccessModal from './SuccessModal';
import RegisterModal from './RegisterModal';
import { logout } from '../actions/authActions';
import { openLoginModal, closeLoginModal } from '../actions/modalActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AppNavbar extends Component {
    state = {
        hover: false,
        open: false,
        drop: false,
        modal: false
    };

    static propTypes = {
        isAuthenticated: PropTypes.func.isRequired
    }

    onMouseEnter = () => {
        this.setState({
            hover: !this.state.hover
        });
    }

    onMouseEnter2 = () => {
        this.setState({
            drop: !this.state.drop
        });
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    static propTypes = {
        logout: PropTypes.func.isRequired,
        success: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    }

    logout = () => {
        this.props.logout();
        this.setState({
            hover: false,
            drop: false
        })
    }

    render() {
    
        return (
            <div>

                {
                    this.state.hover || this.state.drop ?
                    <div className="test" onMouseEnter={this.onMouseEnter2} onMouseLeave={this.onMouseEnter2}>
                        <Link to="/dashboard">Dashboard</Link>
                        {
                            this.props.isAuthenticated ?
                            <a href="#" onClick={this.logout}>Logout</a>
                            :
                            <a href="#" onClick={this.props.openLoginModal}>Login</a>
                        }
                        
                    </div> : null
                    
                }

                {
                    this.props.loginModal ? <LoginModal /> : null
                }
                {
                    this.props.registerModal ? <RegisterModal /> : null
                }
                <SuccessModal />
                
                <div className="topnav" id="largeScreen">
                    <div className="navItems">
                        <Link to="/" className="title">Eternal Chefs</Link>
                        <Link to="/purchase" className="item">Purchase</Link>
                        <Link to="/faq" className="item">FAQ</Link>
                        <Link to="/contactus" className="item">Contact Us</Link>
                    </div>
                    <div className="dropdown" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseEnter} >
                        <a className="item" href="#">
                            <img className="logo" src={Profile} alt=""/>
                        </a>
                    </div> 
                    <div className="logoContainer">
                        <a className="item" href="https://www.instagram.com/eternalchefs/" target="_blank" rel="noopener noreferrer">
                            <img className="logo" src={Instagram} alt="" />
                        </a>
                        <a className="item" href="https://twitter.com/eternalchefs" target="_blank" rel="noopener noreferrer">
                            <img className="logo" src={Twitter} alt="" />
                        </a>
                    </div>
                </div>

                <div className="topnav" id="mobile">
                    <Link className="title" to="/">Eternal Chefs</Link>
                    {
                        this.state.open ? 
                        <div className="myLinks">
                            <Link className="item" to="/purchase">Purchase</Link>
                            <Link className="item" to="/faq">FAQ</Link>
                            <Link className="item" to="/contactus">Contact Us</Link>
                            <Link className="item" to="/dashboard">Dashboard</Link>
                            <div className="item" onClick={this.props.openLoginModal}>Login</div>
                            <div className="item" style={{width: '100%', marginBottom: '10px'}}>
                                <a href="https://www.instagram.com/eternalchefs/" style={{float: 'left'}} target="_blank" rel="noopener noreferrer" alt="">
                                    <img className="logo" src={Instagram} alt="" />
                                </a>
                                <a href="https://twitter.com/eternalchefs" style={{marginLeft: '20px', float: 'left'}} target="_blank" rel="noopener noreferrer" alt="">
                                    <img className="logo" src={Twitter} alt="" />
                                </a>
                            </div>
                        </div> : null
                    }
                    <a href="#" className="icon item" onClick={this.toggle}>
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginModal: state.modal.loginModal,
    registerModal: state.modal.registerModal,
    success: state.auth.success
});

export default connect(mapStateToProps, { logout, openLoginModal, closeLoginModal })(AppNavbar);