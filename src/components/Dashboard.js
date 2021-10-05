import React, { useRef, useState, useCallback } from "react"
import Table from "./Table"
import Styles from "./Styles"


const Dashboard = (props) => {
  const serachText = useRef()
  const [searchedUser, setsearchedUser] = useState(null);
  const [usersList, setusersList] = useState([]);

  const handleGet = useCallback(async (e) => {
    e.preventDefault()
    await setsearchedUser(serachText.current.value)
    if (serachText.current.value !== "test") {
      alert("enter user name")
    } else {
      let x = await getUsers(serachText.current.value, false).then((users) => { return users }).catch((error) => alert(error));
      setusersList(x)
    }
  })

  const getUsers = (user, val) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Set-Cookie", "JSESSIONID=02F5C8FBC7816583C2664B1A47EB9DF4; SameSite=None; Secure");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      withCredentials: true,
      redirect: 'follow'
    };

    return fetch(`https://mock-api.m1amdocs.io/v60/admin/search/user?keyword=${user}&alias=${val}`, requestOptions)
      .then(response => response.json())
      .catch(err => console.log('error', err));
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'USERS',
        columns: [
          {
            Header: 'Username',
            accessor: 'username',
          },
          {
            Header: 'Name',
            accessor: 'displayName',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
        ],
      },
    ],
    []
  )

  return (
    <section className="search-wrapper">
      <div className="search-section">
        <label>Search User
          <input type="text" className="username" ref={serachText} />
        </label>
        <button className="submit-button" onClick={handleGet}>Search</button>
      </div>
      <div className="result-section">

        {searchedUser && <p>SEARCH RESULT FOR: {searchedUser}</p>}
        {usersList.length !== 0 ? <Styles>
          <Table columns={columns} data={usersList} />
        </Styles> : <div>Empty</div>}

      </div>
    </section>
  )
}

export default Dashboard
