import React from "react"
import "./footer.css"
import wiki from "./wikifooter-removebg-preview.png"

function Footer(){
    return(
        <div className="footer-container">
            <div className="footer-main">
                <div className="footer-left">
                    <h3>Wikipedia</h3>
                    <ul>
                        <li>Launch (2001): Founded by Jimmy Wales and Larry Sanger on January 15, 2001, Wikipedia aimed to create a free, editable online encyclopedia.</li>
                        <br />
                        <li>Global Impact as Nonprofit: Operated by the nonprofit Wikimedia Foundation, Wikipedia provides free knowledge globally</li>
                    </ul>
                    <h7 style={{color:"grey"}}>Wikipedia.clone || noCopyRight ©</h7>
                </div>
                <div className="footer-right">
                    <img src={wiki} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer