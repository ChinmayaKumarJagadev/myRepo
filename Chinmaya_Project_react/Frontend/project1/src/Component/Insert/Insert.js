import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Insert.css';
import axios from 'axios';
const Insert = () => {

    return (
        <Formik
            initialValues={{
                Name: '',
                Email: '',
                MobileNo: "",
                DOB: "",
                Address: "",
                UserName: "",
                Password: '',
            }}
            validationSchema={Yup.object().shape({

                Name: Yup.string()
                    .required('Name is required'),

                Email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),

                MobileNo: Yup.string()
                    .min(10, "Number must be minimum 10 digits")
                    .required('A phone number is required'),

                DOB: Yup.date()
                    .required("DOB is required"),

                Address: Yup.string()
                    .required("Address is required"),

                UserName: Yup.string()
                    .required('UserName is required'),

                Password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),

            })}

            onSubmit={fields => {
                axios.post("/signup", fields)
                    .then(() => {
                        alert("Successfully Registered.")
                        window.location.reload();
                    }).catch((err) => {
                        console.log(err)
                        alert("Error")
                    })

                console.log(fields);
            }}>

            { props => {
                return (
                    <div className="edit">
                        <h2 >ADD A User</h2>
                        <h1>Add A User</h1>
                        <Form className="edit1">

                            <div className="e1">
                                <label htmlFor="Name">Name</label>
                                <Field name="Name" type="text" className='design1' />
                                <ErrorMessage name="Name" component="div" className="error" />
                            </div><br />
                            <div className="e2">
                                <label htmlFor="Email">Email</label>
                                <Field name="Email" type="text" className='design1' />
                                <ErrorMessage name="Email" component="div" className="error" />
                            </div><br />
                            <div className="e3">
                                <label htmlFor="MobileNo">MobileNo</label>
                                <Field name="MobileNo" type="number" className='design1' />
                                <ErrorMessage name="MobileNo" component="div" className="error" />
                            </div><br />
                            <div className="e4">
                                <label htmlFor="DOB">DOB</label>
                                <Field name="DOB" type="date" className='design1' />
                                <ErrorMessage name="DOB" component="div" className="error" />
                            </div><br />
                            <div className="e5">
                                <label htmlFor="Address">Address</label>
                                <Field name="Address" type="text" className='design1' />
                                <ErrorMessage name="Address" component="div" className="error" />
                            </div><br />
                            <div className="e6">
                                <label htmlFor="UserName">UserName</label>
                                <Field name="UserName" type="text" className='design1' />
                                <ErrorMessage name="UserName" component="div" className="error" />
                            </div><br />
                            <div className="e7">
                                <label htmlFor="Password">Password</label>
                                <Field name="Password" type="password" className='design1' />
                                <ErrorMessage name="Password" component="div" className="error" />
                            </div><br />

                            <div className="e8">
                                <button className="btn1" type="submit" >Add User</button>
                            </div>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )

}

export default Insert;