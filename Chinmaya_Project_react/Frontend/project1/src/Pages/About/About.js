import React, { useState, useEffect } from "react";
import "./About.css";
import axios from "axios";
import { Link } from "react-router-dom";
import MenuBar3 from "../../MenuBar/MenuBar3";
import ReactPaginate from 'react-paginate';

const URL = "/viewdetails";

const Table = ({}) => {
  const [user, setUser] = useState([]);
  const [searchItems, setSearchItems] = useState("");
  const [pageCount, setPageCount] = useState(0)
  const userPerPage= 5
  const pageVisited = userPerPage * pageCount

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(URL);
    setUser(response.data);
  };

  const deleteData = (ID) => {
    if (window.confirm("Are You sure to Delete this record ?")) {
      axios.delete(`${URL}/${ID}`).then((res) => {
        const remove = user.filter((user) => ID !== user.ID);
        setUser(remove);
      });
    }
  };

  const renderHeader = () => {
    let headerElement = [
      "ID",
      "Name",
      "Email",
      "MobileNo",
      "DOB",
      "Address",
      "UserName",
      "created_at",
      "updated_at",
      "Operation",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
      console.log(pageVisited, pageVisited + userPerPage)
    return (
      user &&
      user.slice(pageVisited, pageVisited + userPerPage)
        .filter((data) => {
          if (searchItems == "") {
            console.log(data);
            return data;
          } else if (
            data.Name.toLowerCase().includes(searchItems.toLowerCase())
          ) {
            console.log(data);
            return data;
          }
        })
        .map(
          ({
            id,
            Name,
            Email,
            MobileNo,
            DOB,
            Address,
            UserName,
            created_at,
            updated_at,
          }) => {
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

                <td className="Opration">
                  <b>
                    <li>
                      <Link to={`/edit/${id}`}>EDIT</Link>
                    </li>
                    <li>
                      <Link onClick={() => deleteData(id)}>DELETE</Link>
                    </li>
                  </b>
                </td>
              </tr>
            );
          }
        )
    );
  };

//   console.log(Math.ceil(user.length/userPerPage))
  const totalPageCount= Math.ceil(user.length / userPerPage)
//   console.log(totalPageCount)

const handlePageChange = ({selected}) =>{
  setPageCount(selected)
}

  return (
    <div>
      <MenuBar3 onSelect={(event) => setSearchItems(event.target.value)} />

      <h1 id="title">
        <b>React Table</b>
      </h1>
      <table id="user">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>

      <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={totalPageCount}
      onPageChange={handlePageChange}
      containerClassName={"paginationBttns"}
      previousLinkClassName={"previousBttn"}
      nextLinkClassName={"nextBttn"}
      disabledClassName={"paginationDisabled"}
      activeClassName={"paginationActive"}

      />
    </div>
  );
};

export default Table;
