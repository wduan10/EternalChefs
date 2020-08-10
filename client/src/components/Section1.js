import React, { Component } from 'react';
import img1 from '../images/img1.JPG';
import { Link } from 'react-router-dom';

class Section1 extends Component {

    render() {

        return (
            <div className="section">
                <div className="cell">
                    <img src={img1} style={{width: '100%', padding: '10%', marginTop: '10%', marginBottom: '10%'}} alt="" />
                </div>
                <div id="s1CellRight" style={{background: "gray"}}>
                    <h2 className="pt-5s">The Only Cook Group You'll Ever Need...</h2>
                    <div className="pt-5s pb-5s">Don't believe us, check out our features below!</div>
                    <Link className="pt-5s" to="/purchase">
                        <button className="button">View Plans</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Section1;