import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { closeRegisterModal } from '../actions/modalActions';

class RegisterModal extends Component {
    state = {
        modal: true,
        name: '',
        email: '',
        password: '',
        retype: '',
        msg: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        if (this.props.registerModal) {
            if (isAuthenticated) {
                this.closeRegisterModal();
            }
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const { name, email, password, retype } = this.state;
        const newUser = {
            name,
            email,
            password,
            retype
        }
        
        this.props.register(newUser);
    }

    render() {
        return (
            <div>
                {
                    this.props.registerModal ?
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="mt-2s">Create Account</h2>
                                <span className="close" onClick={this.props.closeRegisterModal}>&times;</span>
                            </div>
                            <div className="modal-body">
                                {
                                    this.state.msg ?
                                    <div className="failContainer">
                                        <div className="fail">{ this.state.msg }</div>
                                    </div> : null
                                }
                                <form method="POST" onSubmit={this.onSubmit} className="registerForm">
                                    <input placeholder="Name" className="input mt-5s" type="text" name="name" onChange={this.onChange} value={this.state.name} />
                                    <br></br>
                                    <input placeholder="Email" className="input mt-5s" type="email" name="email" onChange={this.onChange} value={this.state.email} />
                                    <br></br>
                                    <input placeholder="Password" type="password" name="password" className="input mt-5s" onChange={this.onChange} value={this.state.password}></input>
                                    <br></br>
                                    <input placeholder="Retype password" type="password" name="retype" className="input mt-5s" onChange={this.onChange} value={this.state.retype}></input>
                                    <button type="submit" disabled={this.props.isLoading} className="mt-5s btn2">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div> : null
                }  
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    registerModal: state.modal.registerModal,
    error: state.error,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { register, closeRegisterModal })(RegisterModal);