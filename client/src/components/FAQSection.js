import React, { Component } from 'react';

class FAQSection extends Component {

    render() {
        
        return (
            <div className="section">
                <div className="faq pl-5s pr-5s pt-5s">
                    <h1>FAQs</h1>
                </div>
                <div className="cell pr-10s pt-5s pb-5s">
                    <strong className="fs-15 pt-5s pb-5s">How does billing work?</strong>
                    <div className="fs-15 pt-5s pb-5s">You will be billed every month on the same date of purchase. For example, if you purchased a membership on July 11, you would be billed on August 11.</div>
                    <strong className="fs-15 pt-5s pb-5s">Why should I choose Eternal Chefs?</strong>
                    <div className="fs-15 pt-5s pb-5s">Eternal Chefs is one of the most affordable cook groups that offers such premium features. We also provide 1-on-1 support that other cook groups lack.</div>
                    <strong className="fs-15 pt-5s pb-5s">What features are included with a membership?</strong>
                    <div className="fs-15 pt-5s pb-5s">You will have access to fast monitors, release guides, early links, bot setups, brick flips, and so much more.</div>
                    <strong className="fs-15 pt-5s pb-5s">Is Eternal Chefs beginner friendly?</strong>
                    <div className="fs-15 pt-5s pb-5s">Eternal Chefs is very beginner friendly! We offer a variety of guides suited for beginners. These guides are perfect for teaching the basics to cop every release.</div>
                    <strong className="fs-15 pt-5s pb-5s">Can I cancel anytime?</strong>
                    <div className="fs-15 pt-5s pb-5s">You may cancel anytime you'd like, but beware as our memberships tend to sell out and cause a wait list.</div>
                    <strong className="fs-15 pt-5s pb-5s">When's the next restock?</strong>
                    <div className="fs-15 pt-5s pb-5s">We will announce all restocks via twitter @eternalchefs</div>
                </div>
            </div>
        )
    }
}

export default FAQSection;