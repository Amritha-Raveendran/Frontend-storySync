import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { googleApi, registerApi } from '../services/allApi'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"





function Register({ type }) {
    const navigate = useNavigate()
    const [agreed, setAgreed] = useState(false);
    const [googleUser, setGoogleUser] = useState([])
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })
    console.log(userDetails);


    const [passwordVisible, setPasswordVisible] = useState(false)
    console.log(passwordVisible);

    const handleRegister = async (e) => {
        e.preventDefault();

        const { username, email, password } = userDetails
        if (!username || !email || !password) {

            toast.warning("Please Fill the form completely")
            setUserDetails({
                username: "",
                email: "",
                password: ""
            })
        }
        else {
            // Api call for user registration
            const result = await registerApi(userDetails)
            console.log(result);
            if (!agreed) {
                toast.warning("You must agree to the terms & conditions");
                return;
            }

            if (result.status == 200) {
                toast.success("Registerd Successfully , Please Login .... ")
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    navigate('/login');
                }, 2000);

            }
            else if (result.status == 406) {
                toast.info(result.response.data)
            }
            else {
                toast.error("Something Went wrong ....")
            }

        }
    }

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            console.log(response);

            const user = response.user
            const token = await user.getIdToken();
            sessionStorage.setItem("token", token);

            const reqBody = {
                username: user.displayName,
                email: user.email,
                userProfile: user.photoURL || "https://via.placeholder.com/150"
            };

            const result = await googleApi(reqBody)
            console.log(result);

            if (result.status >= 200 && result.status < 300) {
                // Merge the Google profile into the backend user response
                const mergedUser = {
                    ...result.data.existingUser,
                    userProfile: result.data.existingUser.userProfile || user.photoURL || "https://via.placeholder.com/150"
                    
                }

                sessionStorage.setItem("existingUser", JSON.stringify(mergedUser))

                sessionStorage.setItem("token", result.data.token)

                sessionStorage.setItem("userId", result.data.existingUser._id)



                toast.success("Logged in successfully")

                window.location.href = "/dashboard"



            } else if (result.status == 406) {
                toast.info(result.response.data)
            }
            else {
                toast.error("Something went wrong")

            }
        } catch (error) {
            toast.error("Google login failed", error)
        }
    }


    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center min-vh-100"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8fDA%3D')", backgroundRepeat: "no-repeat" }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-8 shadow rounded-4 d-flex flex-column flex-md-row p-0 bg-white">

                            <div className="col-md-6 p-4">
                                <h2 className="text-dark fw-bold text-center text-md-start">Sign Up</h2>
                                <p className="text-muted text-center text-md-start">
                                    Please enter your details
                                </p>

                                <form>

                                    <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="mb-3 position-relative">
                                        <label className="form-label">Password</label>
                                        <input
                                            value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                            type={passwordVisible ? "text" : "password"}
                                            className="form-control"
                                            placeholder="Enter your password"


                                        />
                                        <span
                                            className="position-absolute end-0 me-3"
                                            style={{ top: "55%", transform: "translateY(0%)", cursor: "pointer" }}

                                        >
                                            <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} style={{ color: "#c2c1c1" }} onClick={() => setPasswordVisible(prev => !prev)} />
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <input type="checkbox" id="rememberMe" checked={agreed}
                                                onChange={(e) => setAgreed(e.target.checked)} />
                                            <label htmlFor="rememberMe" className="ms-2 text-muted">
                                                I agree terms & conditions
                                            </label>
                                        </div>

                                    </div>

                                    <Link to={"/login"}>
                                        <button onClick={handleRegister}
                                            className="btn btn-primary w-100 mt-3"
                                            style={{ backgroundColor: "#8b5cf6", border: "none" }}
                                        >
                                            Register
                                        </button>
                                    </Link>
                                </form>

                                <div className="text-center my-3">Or Continue With</div>

                                <div className="d-flex justify-content-center gap-3">
                                    <button className="btn btn-light border d-flex align-items-center" onClick={handleGoogleAuth}>
                                        <img
                                            src="https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj"
                                            alt="Google"
                                            width="30"
                                            height="30"
                                            className="me-2"
                                        />
                                        Google
                                    </button>

                                </div>

                                <p className="text-center mt-3 text-muted">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-primary">
                                        Sign In
                                    </a>
                                </p>
                            </div>


                            <div className="col-md-6 d-none d-md-block">
                                <img
                                    src="https://t3.ftcdn.net/jpg/05/54/52/34/360_F_554523496_K9wIKslSbPU1d8WCQwPsTWo5cGDNRKMp.jpg"
                                    alt="Login Side"
                                    className="img-fluid h-100 w-100 rounded-end-4"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    theme="colored"
                    transition={Bounce}
                />
            </div>

        </>
    )
}

export default Register