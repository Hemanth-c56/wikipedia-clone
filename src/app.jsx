import React from "react"
import "./app.css"
import Body from "./components/body/body"
import Footer from "./components/footer/footer"


function App(){
    return(
        <div className="main-body">
            <Body />
            <Footer/>
        </div>
    )
}

export default App
