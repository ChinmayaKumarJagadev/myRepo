import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import './MenuBar2.css'

class MenuBar2 extends Component {

    logoutHandler = (e) => {
        const token = localStorage.removeItem("authToken")
        console.log(token)
        this.props.history.push("/login")

    }
    render() {
        return (

            <div className="Navbar">
                <nav>

                    <div className="navbar2">
                        <ul className="nav-links2">
                            <b>
                                <li> <Link to="/viewdetails">viewdetails</Link></li>
                            </b>
                            <div className="logout"><button onClick={(e) => this.logoutHandler()}>Logout</button></div>
                        </ul>

                    </div>

                </nav>
            </div>
        )
    }
}
export default withRouter(MenuBar2);
