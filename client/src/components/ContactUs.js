import React, { Component } from 'react';
import Instagram from '../images/Instagram.png';
import Twitter from '../images/Twitter.png';
import { email as Email } from '../actions/emailActions';
import { clearErrors } from '../actions/errorActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Contact extends Component {

    state = {
        name: '',
        email: '',
        message: '',
        msg: ''
    }

    static propTypes = {
        Email: PropTypes.func.isRequired,
        emailStatus: PropTypes.string,
        error: PropTypes.object.isRequired,
        isLoading: PropTypes.bool,
        clearErrors: PropTypes.func.isRequired
    }

    onChange = (event) => {
        this.setState( { [event.target.name]: event.target.value } );
    };

    onSubmit = (event) =>  {
        event.preventDefault();
        this.props.clearErrors();
        
        const { name, email, message } = this.state;

        const newEmail = {
            name,
            email,
            message
        };

        this.setState({
            name: '',
            email: '',
            message: ''
        });
        
        this.props.Email(newEmail);
    }

    render() {

        return (
            <div className="section">
                <div className="contactLeftCell">
                    <div className="fs-40">Contact Us</div>
                    <div className="pt-5s fs-15">eternalchefs@gmail.com</div>
                    <div className="pt-5s">
                        <a href="https://discord.gg/Rh4NFjd" target="_blank" style={{color: 'red'}} className="fs-20" rel="noopener noreferrer">Join the discord</a>
                    </div>
                    <div className="pt-5s">
                        <a href="https://www.instagram.com/eternalchefs/" target="_blank" rel="noopener noreferrer">
                            <img src={Instagram} className="logo mr-2s" alt="" />
                        </a>
                        <a href="https://twitter.com/eternalchefs" target="_blank" rel="noopener noreferrer">
                        <img src={Twitter} className="logo mr-2s" alt="" />
                        </a>
                    </div>
                </div>
                <div className="contactRightCell">
                    {
                        this.props.isLoading ?
                        <div className="alertContainer" style={{background: 'blue'}}>
                            <div className="alert">Loading</div>
                        </div> : null
                    }
                    {
                        this.props.emailStatus === 'success' && !this.props.isLoading ?
                        <div className="alertContainer" style={{background: 'green'}}>
                            <div className="alert">Success</div>
                        </div> : null
                    }
                    {
                        this.props.emailStatus === 'fail' && !this.props.isLoading ?
                        <div className="alertContainer" style={{background: 'red'}}>
                            <div className="alert">{ this.props.error }</div>
                        </div> : null
                    }
                    <form method="POST" onSubmit={this.onSubmit} className="formContainer">
                        <label className="mt-2s">Name</label>
                        <br></br>
                        <input className="input" type="text" name="name" onChange={this.onChange} value={this.state.name} />
                        <br></br>
                        <label className="mt-2s">Email</label>
                        <br></br>
                        <input className="input" type="email" name="email" onChange={this.onChange} value={this.state.email} />
                        <br></br>
                        <label className="mt-2s">Message</label>
                        <br></br>
                        <textarea type="text" name="message" className="input h-100p" onChange={this.onChange} value={this.state.message}></textarea>
                        <br></br>
                        <button type="submit" disabled={this.props.isLoading} className="mt-2s btn2">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    emailStatus: state.email.emailStatus,
    error: state.error.msg,
    isLoading: state.email.isLoading
});

export default connect(mapStateToProps, { Email, clearErrors })(Contact);