import React, { useState, useEffect } from 'react';
import './About.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import MenuBar3 from '../../MenuBar/MenuBar3'

const URL = '/viewdetails'

const Table = ({ }) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setUser(response.data)
    }

    const deleteData = (ID) => {
       if(window.confirm('Are You sure to Delete this record ?')) {
            axios.delete(`${URL}/${ID}`).then(res => {
                const remove = user.filter(user => ID !== user.ID)
                setUser(remove)
            })
        }


    }

    const renderHeader = () => {
        let headerElement = ['ID', 'Name', 'Email', 'MobileNo', 'DOB', 'Address', 'UserName', 'created_at', 'updated_at', 'Operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }


    const renderBody = () => {
        return user && user.map(({ id, Name, Email, MobileNo, DOB, Address, UserName, created_at, updated_at }) => {
            return (

                <tr key={id}>
                    <td>{id}</td>
                    <td>{Name}</td>
                    <td>{Email}</td>
                    <td>{MobileNo}</td>
                    <td>{DOB}</td>
                    <td>{Address}</td>
                    <td>{UserName}</td>
                    <td>{created_at}</td>
                    <td>{updated_at}</td>

                    <td className='Opration'>
                        <b>
                            <li><Link to={`/edit/${id}`}>EDIT</Link></li>
                            <li><Link onClick={() => deleteData(id)}>DELETE</Link></li>
                        </b>
                    </td>
                </tr>

            )
        })
    }

    return (
        <div>
            <MenuBar3 />
            <h1 id='title'><b>React Table</b></h1>
            <table id='user'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </div>
    )
}


export default Table












   