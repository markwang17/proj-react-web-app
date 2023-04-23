import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {registerThunk} from "../services/user-thunks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("1990-01-01");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        if (password !== confirm) {
            alert("Those passwords didn't match. Try again.")
            return
        }
        try {
            await dispatch(registerThunk({ username, password, firstName, lastName, dob, email, role })).unwrap();
            navigate("/profile");
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="mt-5">
            <div className="form-bg ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="form-container">
                                <div className="form-icon">
                                    <FontAwesomeIcon icon="fa-solid fa-user"/>
                                </div>
                                <div className="form-horizontal rounded-5">
                                    <h3 className="title">Register Now</h3>
                                    <div className="form-group">
                                        <span className="input-icon"><FontAwesomeIcon icon="fa-solid fa-user"/></span>
                                        <input className="form-control" type="text" placeholder="Username" required
                                               value={username} onChange={(event) => setUsername(event.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><FontAwesomeIcon icon="fa-solid fa-envelope"/></span>
                                        <input className="form-control" type="email" placeholder="Email Address"
                                               value={email} onChange={(event) => setEmail(event.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><FontAwesomeIcon icon="fa-solid fa-user"/></span>
                                        <input className="form-control" type="text" placeholder="First Name"
                                               value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><FontAwesomeIcon icon="fa-solid fa-user"/></span>
                                        <input className="form-control" type="text" placeholder="Last Name"
                                               value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><FontAwesomeIcon icon="fa-solid fa-user-group"/></span>
                                        <select name="roles" id="roles" className="form-control"
                                                value={role} onChange={(event) => setRole(event.target.value)}>
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><FontAwesomeIcon icon="fa-solid fa-calendar-days"/></span>
                                        <input className="form-control" type="date"
                                               value={dob} onChange={(event) => setDob(event.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><FontAwesomeIcon icon="fa-solid fa-lock"/></span>
                                        <input className="form-control" type="password" placeholder="Password" required
                                               value={password} onChange={(event) => setPassword(event.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <span className="input-icon"><FontAwesomeIcon icon="fa-solid fa-lock"/></span>
                                        <input className="form-control" type="password" placeholder="Confirm Password" required
                                               value={confirm} onChange={(event) => setConfirm(event.target.value)}/>
                                    </div>
                                    <button className="btn signin" onClick={handleRegister}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
        .form-container{
            font-family: 'Roboto', sans-serif;
            padding: 42px 0 0 0;
            position: relative;
        }
        .form-container .form-icon{
            color: #fff;
            background-color: #1E4AC5;
            font-size: 50px;
            text-align: center;
            line-height: 95px;
            height: 100px;
            width: 100px;
            border: 5px solid #fff;
            border-radius: 50%;
            box-shadow: 0 0 0 5px #20E4B2,0 0 20px rgba(0,0,0,0.3);
            transform: translateX(-50%);
            position: absolute;
            top: 2px;
            left: 50%;
            z-index: 1;
        }
        .form-container .form-horizontal{
            background-color: #2048C4;
            font-size: 0;
            padding: 80px 30px 30px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .form-container .title{
            color: #20E5B0;
            font-size: 27px;
            font-weight: 600;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0 0 25px;
        }
        .form-horizontal .form-group{
            background-color: #fff;
            width: calc(50% - 12px);
            margin: 0 7px 25px 5px;
            border-radius: 10px;
            overflow: hidden;
            display: inline-block;
        }
        .form-horizontal .input-icon{
            color: rgba(0,0,0,0.3);
            background-color: #20E5B0;
            font-size: 18px;
            text-align: center;
            line-height: 39px;
            height: 38px;
            width: 48px;
            vertical-align: top;
            display: inline-block;
        }
        .form-horizontal .form-control{
            color: #222;
            background-color: transparent;
            font-size: 15px;
            font-weight: 400;
            letter-spacing: 1px;
            width: calc(100% - 53px);
            height: 38px;
            padding: 1px 10px 0 7px;
            box-shadow: none;
            border: none;
            border-radius: 0;
            display: inline-block;
            transition: all 0.3s;
        }
        .form-horizontal textarea.form-control{
            height: auto;
            width: 100%;
        }
        .form-horizontal .form-control:focus{
            box-shadow: none;
            border: none;
        }
        .form-horizontal .form-control::placeholder{
            color: #b5b5b5;
            font-size: 15px;
            font-weight: 400;
            text-transform: capitalize;
        }
        .form-horizontal .btn{
            color: #fff;
            background-color: #20E5B0;
            font-size: 18px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 10px 15px 7px 20px;
            margin: 0 auto;
            border: none;
            border-radius: 10px;
            box-shadow: 0 5px 0 rgba(0,0,0,0.5);
            display: block;
            transition: all 0.3s ease 0s;
        }
        .form-horizontal .btn:hover,
        .form-horizontal .btn:focus{
            color: #2048C4;
            background-color: #fff;
            box-shadow: none;
        }
        @media only screen and (max-width:576px){
            .form-container .form-group{
                width: 100%;
                margin: 0 0 25px;
            }
        }
        `}
            </style>
        </div>
    )
}

export default RegisterScreen;