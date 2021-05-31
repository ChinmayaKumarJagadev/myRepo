import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './MenuBar.css'

class MenuBar extends Component {
    render() {
        return (
            <div className="Navbar">
                <nav>

                    <div className="navbar">
                        <ul className="nav-links">
                            <b>
                                <li> <Link to="/">Home</Link></li>

                                <li><Link to="/login">Login</Link></li>

                                <li><Link to="/signup">Signup</Link></li>
                                {/* <li><Link to= "/viewdetails">View Details</Link></li> */}
                            </b>
                            <h2>React</h2>
                            <img src="/Image/Logo1.png" alt="error" />
                        </ul>
                    </div>


                </nav>
            </div>
        )
    }
}
export default MenuBar;
