import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Edit.css';

const EditUser = () => {

  const { id } = useParams();
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    MobileNo: "",
    DOB: "",
    Address: "",
    UserName: "",

  });

  const { Name, Email, MobileNo, DOB, Address, UserName } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`/edit/${id}`, user);
    alert("Successfully Edited.")
  };

  const loadUser = async () => {
    const result = await axios.get(`/edit/${id}`);
    setUser(result.data[0]);

  };
  return (

    <div className="Sign2">
      <h1>Edit the User</h1>
      <h1>Edit User</h1>
      <form onSubmit={e => onSubmit(e)} className="signup2">
        <div className="e1">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            className="design1"
            placeholder="Enter Your Name"
            name="Name"
            value={Name}
            onChange={e => onInputChange(e)}
          />
        </div>
        <div className="e2">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            className="design1"
            placeholder="Enter Your Email"
            name="Email"
            value={Email}
            onChange={e => onInputChange(e)}
          />
        </div>
        <div className="e3">
          <label htmlFor="MobileNo">MobileNo</label>
          <input
            type="number"
            className="design1"
            placeholder="Enter Your Mobile No"
            name="MobileNo"
            value={MobileNo}
            onChange={e => onInputChange(e)}
          />
        </div>
        <div className="e4">
          <label htmlFor="DOB">DOB</label>
          <input
            type="date"
            className="design1"
            placeholder="Enter Your DOB"
            name="DOB"
            value={DOB}
            onChange={e => onInputChange(e)}
          />
        </div>
        <div className="e5">
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            className="design1"
            placeholder="Enter Your Address"
            name="Address"
            value={Address}
            onChange={e => onInputChange(e)}
          />
        </div>
        <div className="e6">
          <label htmlFor="UserName">UserName</label>
          <input
            type="text"
            className="design1"
            placeholder="Enter Your UserName"
            name="UserName"
            value={UserName}
            onChange={e => onInputChange(e)}
          />
        </div>

        <button className="btn1">Update User</button>
      </form>
    </div>

  );
};

export default EditUser;