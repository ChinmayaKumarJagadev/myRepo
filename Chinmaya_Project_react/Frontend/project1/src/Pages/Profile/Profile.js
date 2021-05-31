import axios from 'axios';
import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import MenuBar2 from '../../MenuBar/MenuBar2';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileDetail: {},

        }
    }
    componentDidMount() {
        console.log(localStorage.getItem('authToken'))
        let auth = localStorage.getItem('authToken');
        console.log(auth);
        this.getData(auth);
    }

    getData(auth) {
        console.log(auth);
        return axios.get("/profile", {
            headers: {
                Authorization: "Bearer " + auth,
            },
        })
            .then(
                (res) => {

                    this.setState({
                        profileDetail: res.data,
                    });
                    console.log(res.data);
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
    }

    render() {

        const { profileDetail } = this.state;
        return (
            <div>
                <MenuBar2 />
                <div className="wrapper1">
                    <h1>Welcome to User Profile</h1>

                    <div className="form-wrapper1">


                     <div><b>ID --</b>  {profileDetail.user ? profileDetail.user.id : null}</div><br /><br />
                        <div><b>UserName --</b>  {profileDetail.user ? profileDetail.user.UserName : null}</div><br /><br />

                        <div><b>Name --  </b>   {profileDetail.user ? profileDetail.user.Name : null}</div><br /><br />

                        <div><b>Email --</b>    {profileDetail.user ? profileDetail.user.Email : null}</div><br /><br />

                        <div><b>MobileNo --</b>  {profileDetail.user ? profileDetail.user.MobileNo : null}</div><br /><br />

                        <div><b>DOB --  </b>    {profileDetail.user ? profileDetail.user.DOB : null}</div><br /><br />

                        <div><b>Address --</b>   {profileDetail.user ? profileDetail.user.Address : null}</div><br /><br />

                        <div><b>created_at --</b>   {profileDetail.user ? profileDetail.user.created_at : null}</div><br /><br />

                        <div><b>updated_at --</b>   {profileDetail.user ? profileDetail.user.updated_at : null}</div>

                    </div>


                </div>
            </div>
        )
    }

}
export default Profile;