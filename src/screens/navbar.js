import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getMovie} from "../igdb/themoviedb-service";
import {profileThunk} from "../services/user-thunks";

const NavBar = ({ active }) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const handleProfileFetch = async () => {
            try {
                const { payload } = await dispatch(profileThunk());
            } catch (e) {
            }
        };
        handleProfileFetch();
    }, []);

    return (
        <nav className="mt-2 navbar navbar-expand-lg navbar-dark rounded-4" style={{backgroundColor: "#2048C4"}}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">
                    TMDB
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className={`nav-item ${active === 'home' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className={`nav-item ${active === 'search' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/themoviedb/search">
                                Search
                            </Link>
                        </li>
                        {currentUser && <li className={`nav-item ${active === 'profile' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/profile">
                                Profile
                            </Link>
                        </li>}
                        {!currentUser && <li className={`nav-item ${active === 'login' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>}
                        {!currentUser && <li className={`nav-item ${active === 'signup' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/register">
                                Signup
                            </Link>
                        </li>}
                    </ul>
                </div>
            </div>
            <style>
                {`
          .navbar-nav > .active > a {
            color: #20E5B0;
          }
          .navbar .nav-link {
              font-weight: bold;
            }
        `}
            </style>
        </nav>
    );
};

const withBanner = (WrappedComponent, active) => {
    return (props) => (
        <div>
            <NavBar active={active}/>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withBanner;