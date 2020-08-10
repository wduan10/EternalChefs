import React, { Component } from 'react';

class Section2 extends Component {

    render() {

        return (
            <div className="section pb-5s" style={{background: 'black'}}>
                <div className="s2Cell">
                    <ul>
                        <li className="li pt-5s">Release guides and early links for every drop</li>
                        <hr className="hr"></hr>
                        <li className="li pt-5s">Blazing fast monitors to notify you of any restocks</li>
                        <hr className="hr"></hr>
                        <li className="li pt-5s">Super fast 1-on-1 support staff to answer any questions you have</li>
                        <hr className="hr"></hr>
                    </ul>
                </div>
                <div className="s2Cell">
                    <ul>
                        <li className="li pt-5s">Top tier group-buys and partnerships</li>
                        <hr className="hr"></hr>
                        <li className="li pt-5s">Helpful tools and resources such as a free in-house Supreme bot</li>
                        <hr className="hr"></hr>
                        <li className="li pt-5s">A wide variety of services including free legit checks and bot setup help</li>
                        <hr className="hr"></hr>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Section2;