import React from 'react'
import payment from "../image/payment.png"
import footerlogo from "../image/footerlogo.png"
import "./Footer.css"

function Footer() {
    return (
        <div className='footer'>
            <div className="footerdetail">
                <div className='footerleft'>
                    <p className='footername'>RIGHT<span className='footercom'>FIT.COM</span></p>
                    <div className="footertab">
                        <p>Home</p>
                        <p>All Products</p>
                        <p>Featured Products</p>
                        <p>Contact</p>
                        <p>About Us</p>
                    </div>
                </div>
                <div className='footermiddle'>
                    <p className='footerdescription'>We are a registered E-Commerce seller and we support a variety of Local and International payment modes</p>
                    <img className='footerpayment' src={payment} alt="" />
                </div>
                <div className='footerright'>
                    <p className='footerdisclaimer'>Website protected by</p>
                    <img src={footerlogo} alt="" className='footerlogo' />
                </div>
            </div>
        </div>
    )
}

export default Footer