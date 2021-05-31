import React, { Component } from 'react';
import './Home.css';
import MenuBar from '../../MenuBar/MenuBar';

class Mainpage extends Component {
    state = {}

    componentDidMount() {
        if (localStorage.getItem("authToken")) {
            this.props.history.push("/profile")
        }
    }
    render() {

        return (
            <div>
                <MenuBar />
                <div className="image">


                    <img src="/Image/React_image.jpg" height="700px" width="100%" alt="error" />

                </div>
            </div>
        )
    }
}
export default Mainpage;