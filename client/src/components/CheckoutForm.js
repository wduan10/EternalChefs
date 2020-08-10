import React, { Component } from 'react';
import {
    CardElement
} from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPaymentIntent } from '../actions/paymentActions';
import { updateUser } from '../actions/authActions';

class CheckoutForm extends Component {
    state = {
        succeeded: false,
        error: null,
        processing: '',
        disabled: true
    }

    static propTypes = {
        clientSecret: PropTypes.string,
        createPaymentIntent: PropTypes.func.isRequired,
        user: PropTypes.object
    }

    componentDidMount() {
        this.props.createPaymentIntent({ items: 'Membership' });
    }

    onChange = async (event) => {
        this.setState({
            disabled: event.empty
        });
        if (event.error) {
            this.setState({
                error: event.error.message
            });
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({
            processing: true
        })

        const { stripe, elements } = this.props;

        if (!stripe || !elements) {
            return;
        }

        const payload = await stripe.confirmCardPayment(this.props.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: event.target.name.value
                }
            }
        });
        
        if (payload.error) {
            this.setState({
                error: 'Payment failed ' + payload.error.message,
                processing: false
            })
        } else {
            this.setState({
                error: null,
                processing: false,
                succeeded: true
            });
            
            this.props.updateUser({ user: this.props.user });
        }
    }

    render() {

        const cardStyle = {
            style: {
                base: {
                    color: "#32325d",
                    fontFamily: 'Arial, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#32325d"
                    }
                },
                invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a"
                }
            }
        };

        const { stripe } = this.props;

        return(
            <form id="payment-form" onSubmit={this.onSubmit}>
                <CardElement id="card-element" options={cardStyle} onChange={this.onChange} />
                <button
                    disabled={this.state.processing || this.state.disabled || this.state.succeeded || !stripe}
                    id="submit"
                >
                    <span id="button-text">
                        {
                            this.state.processing ? (
                            <div className="spinner" id="spinner"></div>
                            ) : (
                            "Pay"
                        )}
                    </span>
                </button>
                {/* Show any error that happens when processing the payment */}
                {this.state.error && (
                <div className="card-error" role="alert">
                    {this.state.error}
                </div>
                )}
                {/* Show a success message upon completion */}
                <p className={this.state.succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded, see the result in your
                    <a
                        href={`https://dashboard.stripe.com/test/payments`}
                    >
                        {" "}
                        Stripe dashboard.
                    </a> Refresh the page to pay again.
                </p>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    clientSecret: state.payment.clientSecret,
    user: state.auth.user
});

export default connect(mapStateToProps, { createPaymentIntent, updateUser })(CheckoutForm);