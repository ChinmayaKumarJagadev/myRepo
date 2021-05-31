import React, { Component } from 'react'
import './MenuBar3.css'
import { Link, withRouter } from "react-router-dom";

class MenuBar3 extends Component {


    logoutHandler = () => {
        const token = localStorage.removeItem("authToken");
        this.props.history.push("/login")
    }


    render() {
        return (

            <div className="Navbar">
                <nav>
                    <div className="navbar3">
                        <ul className="nav-links3">
                            <b>
                                <li><Link to="/add">ADD New Record</Link></li>
                            </b>
                            <div className="logout1"><button className="logout1" onClick={(e) => this.logoutHandler()}>Logout</button></div>
                        </ul>
                    </div>

                </nav>
            </div>

        )
    }

}
export default withRouter(MenuBar3);