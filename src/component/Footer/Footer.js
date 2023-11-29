import React from 'react'
import payment from "../image/payment.png"
import footerlogo from "../image/footerlogo.png"
import footerlogowebp from "../image/footerlogo.webp"
import paymentlogo from "../image/payment.webp"
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
                    <picture>
                        <source srcSet={paymentlogo} type="image/webp" />
                        <img className='footerpayment' src={payment} alt="" />
                    </picture>
                    
                </div>
                <div className='footerright'>
                    <p className='footerdisclaimer'>Website protected by</p>
                    <picture>
                        <source srcSet={footerlogowebp} type="image/webp" />
                        <img src={footerlogo} alt="" className='footerlogo' />
                    </picture>
                    
                </div>
            </div>
        </div>
    )
}

export default Footer