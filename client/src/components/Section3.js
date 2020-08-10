import React, { Component } from 'react';
import Logo from '../images/logo2.png';

class Section3 extends Component {

    render() {

        return (
            <div className="imgSection pb-5s">
                <div className="center pt-5s">
                    <img src={Logo} className="Logo" alt=""/>
                </div>
                <div className="text">A glimpse of the success our members have had in the first two months of opening</div>
            </div>
        )
    }
}

export default Section3;