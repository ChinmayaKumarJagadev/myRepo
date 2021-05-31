import React, { Component } from 'react';
import './NotFound.css';
class PageNotFound extends Component {

    render() {
        return (
            <div className="notfound" >
                <p className="error1">404 Error</p>
                <b>Page Not Found</b>
            </div>
        )
    }
}
export default PageNotFound;