import React from 'react';

const FAQ = () => {
    return (
        <div>
            <div className="text-center my-10">
                <h1 className="text-5xl font-extrabold">Frequently Asked Questions</h1>
            </div>
            <div className="join join-vertical w-full bg-gray-100">
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title text-xl font-medium">How do I determine the value of a property?</div>
                    <div className="collapse-content">
                        <p>The value of a property is determined by factors like location, size, condition, market trends, and comparable properties in the area (comps).</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">What is the best time to buy or sell a property?</div>
                    <div className="collapse-content">
                        <p>The best time varies depending on market conditions. Generally, spring and summer are popular for buying and selling due to increased inventory and demand. However, off-season periods like winter may offer better deals for buyers.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">How much should I budget for closing costs?</div>
                    <div className="collapse-content">
                        <p>Closing costs typically range from 2% to 5% of the property’s purchase price. These costs include fees for inspections, appraisals, title insurance, taxes, and lender charges. Always ask your agent or lender for an estimate.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;