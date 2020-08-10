import React, { Component } from 'react';
import purchase from '../images/purchase.JPG';
import CheckoutForm from './CheckoutForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

class Cart extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    render() {

        return (
            <div className="section">
                <div className="cell pl-10s pr-10s">
                    <div className="monthly">Monthly Membership</div>
                    <div className="pt-10s center">$25.00</div>
                    <div className="center mt-5">
                        {
                            this.props.isAuthenticated ?
                            <Elements stripe={promise}>
                                <ElementsConsumer>
                                    {({elements, stripe}) => (
                                        <CheckoutForm elements={elements} stripe={stripe} />
                                    )}
                                </ElementsConsumer>
                            </Elements> :
                            <div>Please login to purchase membership</div>
                        }
                    </div>
                </div>
                <div className="cell" style={{padding: '10%'}}>
                    <img src={purchase} style={{width: '100%'}} alt="" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Cart);