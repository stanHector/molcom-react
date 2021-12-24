import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from 'react-router-dom';

const Login = (props) => {
    const [isloading, setIsLoading] = useState(false)
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = JSON.parse(localStorage.getItem('user'))?.status;

    console.log('Userprofile ' + user)
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true)
        const user = { usernameOrEmail, password };

        try {
            const { data } = await axios.post("https://molcom-server.herokuapp.com/api/auth/signin",
                user)
            console.log("data: " + data)
            if (data.message === "Login Successful") {
                props.updateUser(data)
                localStorage.setItem('user', JSON.stringify(data))

                setIsLoading(false)
                history.push({
                    pathname: "/dashboard",
                    state: {
                        id: data.id
                    }
                })
            }
        } catch (error) {
            if (error.message === 'Request failed with status code 404') alert('User does not exist');
            else if (error.message === 'Request failed with status code 500') alert('Password Mismatch')
            else {
                console.log(error.message)
            }
            setIsLoading(false)
        }
    };

    return (

        <div className="container" style={{ marginTop: "15px", padding: "50px" }}>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">

                    <h3 className="text-center" style={{ margin: "15px", fontWeight: "bold" }}> Enter Login Details </h3>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <label style={{ marginTop: "10px" }} htmlFor="usernameOrEmail">Enter  Email: </label>
                            <div className="col-sm-12">
                                <input className="form-control" type="text" value={usernameOrEmail} placeholder=" " onChange={({ target }) => setUsernameOrEmail(target.value)} />
                            </div>
                            <div>
                                <label style={{ marginTop: "10px" }} htmlFor="password">Enter Password: </label>
                                <div className="col-sm-12">
                                    <input className="form-control" type="password" value={password} placeholder=" " onChange={({ target }) => setPassword(target.value)} />
                                </div>
                            </div>
                            <div className="form-row text-center" style={{ marginTop: "12px", }}>
                                <div className="col-sm-12">
                                    <button className="button-40" role="button"
                                        type="submit" disabled={isloading}>
                                        {isloading && <div className="spinner-border text-light" role="status"></div>}
                                        Login
                                    </button>
                                </div>
                            </div>
                            <div className="center" style={{ marginTop: "10px" }} >
                                <Link to={"/create"} >Click here to create account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
};

export default Login;