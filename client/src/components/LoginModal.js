import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { openLoginModal, closeLoginModal, openRegisterModal } from '../actions/modalActions';

class LoginModal extends Component {
    state = {
        email: '',
        password: '',
        msg: ''
    }

    static propTypes = {
        closeLoginModal: PropTypes.func.isRequired,
        loginModal: PropTypes.bool.isRequired,
        registerModal: PropTypes.bool,
        error: PropTypes.object
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        if (this.props.loginModal) {
            if (isAuthenticated) {
                this.props.closeLoginModal();
            }
        }
    }

    toggle = () => {
        this.props.closeLoginModal();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.clearErrors();

        const { email, password } = this.state;
        const user = {
            email,
            password
        }
        
        this.props.login(user);
    }

    render() {
        return (
            <div>
                {
                    this.props.loginModal ?
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="mt-2s" style={{float: 'left'}}>Login</h2>
                                <span className="close" onClick={this.props.closeLoginModal}>&times;</span>
                            </div>
                            <div className="modal-body">
                                {
                                    this.state.msg ?
                                    <div className="failContainer">
                                        <div className="fail">{ this.state.msg }</div>
                                    </div> : null
                                }
                                <form method="POST" onSubmit={this.onSubmit} className="registerForm">
                                    <input placeholder="Email" className="input mt-5s" type="email" name="email" onChange={this.onChange} value={this.state.email} />
                                    <br></br>
                                    <input placeholder="Password" type="password" name="password" className="input mt-5s" onChange={this.onChange} value={this.state.password}></input>
                                    <button type="submit" disabled={this.props.isLoading} className="mt-5s btn2">Submit</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <a href="#" className="create" onClick={this.props.openRegisterModal}>Create account</a>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loginModal: state.modal.loginModal,
    registerModal: state.modal.registerModal,
    error: state.error,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { login, clearErrors, openLoginModal, closeLoginModal, openRegisterModal })(LoginModal);