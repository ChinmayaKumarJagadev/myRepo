import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css'
import { Redirect } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from 'axios'
import MenuBar from '../../MenuBar/MenuBar'


class Loginpage extends React.Component {

    componentDidMount() {
        if (localStorage.getItem("authToken")) {
            this.props.history.push("/profile")
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    UserName: '',
                    Password: '',
                }}
                validationSchema={Yup.object().shape({
                    UserName: Yup.string()
                        .required('User Name is required'),

                    Password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                })}


                onSubmit={fields => {
                    axios.post("/login", fields)
                        .then((response) => {
                            if (response.status === 200) {
                                alert(response.data.success)
                                localStorage.setItem("authToken", response.data.token)
                                if (response.data.code === 200) {
                                    this.props.history.push("/profile")
                                }
                                window.location.reload();
                            } else if (response.status === 206) {
                                alert(response.data.success)
                                window.location.reload()

                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    console.log(fields)
                }}

                render={({ errors, status, touched }) => (
                    <div>
                        <MenuBar />
                        <div className="wrapper ">
                            <Form className="form-wrapper ">
                                <div className="l1">
                                    <label htmlFor="UserName">UserName</label>
                                    <Field name="UserName" type="text" className='design' />
                                    <ErrorMessage name="UserName" component="div" className="error" />
                                </div>
                                <br />
                                <div className="l2">
                                    <label htmlFor="Password">Password</label>
                                    <Field name="Password" type="password" className='design' />
                                    <ErrorMessage name="Password" component="div" className="error" />
                                </div>
                                <br />
                                <div className="l3">
                                    <button className="btn" type="submit">Login</button>
                                </div>

                            </Form>
                        </div>
                    </div>
                )
                }
            />
        )

    }
}

export default Loginpage;