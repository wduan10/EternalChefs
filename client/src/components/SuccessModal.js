import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetSuccess} from '../actions/authActions';

class SuccessModal extends Component {
    state = {
        modal: '',
        email: '',
        password: '',
        msg: ''
    }

    static propTypes = {
        success: PropTypes.bool
    }

    componentDidUpdate(prevProps) {

        if (this.props.success && !prevProps.success) {
            this.setState({
                modal: true
            });
            setTimeout(() => {
                this.props.resetSuccess();
                this.setState({
                    modal: false
                });
            }, 1000);
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.modal ?
                    <div className="modal">
                        <div className="success-content">
                            <div className="success">Success</div>
                        </div>
                    </div> : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    success: state.auth.success
});

export default connect(mapStateToProps, { resetSuccess })(SuccessModal);