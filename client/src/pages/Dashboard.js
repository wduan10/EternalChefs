import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends Component {
    state = {
        date: ''
    }

    static propTypes = {
        user: PropTypes.object,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        if (this.props.user) {
            this.calculate();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.user && this.props.user) {
            this.calculate();
        }
    }

    parseISOString = (s) => {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    calculate = () => {
        const someDate = this.parseISOString(this.props.user.initial_payment);
        const days = this.props.user.payments * 30;
        someDate.setTime(someDate.getTime() + days*86400000); 
        const dd = someDate.getDate();
        const mm = someDate.getMonth() + 1;
        const y = someDate.getFullYear();
        const someFormattedDate = mm + '/'+ dd + '/'+ y;
        this.setState({
            date: someFormattedDate
        });
    }

    render() {
        return (
            <div>
                <AppNavbar />
                {
                    this.props.isAuthenticated ?
                    <div className="welcome">Welcome, { this.props.user.name }</div> :
                    <div className="welcome">Please login to access dashboard</div>
                }
                {
                    this.state.date && this.props.isAuthenticated ? <div className="info">Your subscription lasts until { this.state.date }</div> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Dashboard);