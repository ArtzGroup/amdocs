import React, { useRef, useState } from "react"

const Login = (props) => {
  const credential = useRef()
  let data = {};
  const [error, setError] = useState("")
  const username = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(username.current.value === "" || credential.current.value === ""){
      alert("Enter value")
    }
    data = JSON.stringify({
      username: username.current.value, credential: credential.current.value
    });
    await userLogin().then(res => {
      if (res.status !== 200) {
        res.text().then((d) => {
          const msg = JSON.parse(d.replace(/'/g, '"'));
          setError(msg?.operationError?.message)
        })
      }
      else {
        setError("")
        props.history.push("/dashboard")
      }
    })

  }
  const userLogin = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };
    return fetch("https://mock-api.m1amdocs.io/v60/admin/session", requestOptions)
      .then(response => {
        return response;
      })
      .catch(err => console.log("Error" + err));
  }

  return (
    <div className="login-wrapper">
      <form className="login-form">
        <h2 className="form-title">Login</h2>
        <label htmlFor="username">
          <input type="text" id="username" className="user-name" ref={username} required />
        </label>
        <label htmlFor="credential">
          <input type="password" id="credential" className="user-credential" ref={credential} required />
        </label>
        <button className="submit-button" onClick={handleSubmit}>Login</button>
        {error && <p className="error-msg">{error}</p>}
      </form>
      {/* <button onClick={handleGet}>Get</button> */}
    </div>
  )
}

export default Login