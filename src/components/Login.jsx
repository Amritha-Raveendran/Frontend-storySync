import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { loginApi } from '../services/allApi'





function Login({ type }) {
    const navigate = useNavigate()
    
    const [userDetails, setUserDetails] = useState({

        email: "",
        password: ""
    })
    console.log(userDetails);

    const [passwordVisible, setPasswordVisible] = useState(false)
    console.log(passwordVisible);

    const handleUserLogin = async (e) => {
        e.preventDefault();


        const { email, password } = userDetails
        console.log(email, password);
        if (!email || !password) {
            toast.warning("Please fill the form completely")

           

            setUserDetails({
                email: "",
                password: ""
            })
        }
        else{
            const result = await loginApi({email,password})
            console.log(result);

            if(result.status >= 200 && result.status < 300){

              toast.success('Logined successfully')  

              sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUsers))
              sessionStorage.setItem("token",result.data.token)

              sessionStorage.setItem("userId", result.data.existingUsers._id)

    
              setUserDetails({
                email:"",
                password:""
              })
              
              setTimeout(()=>{
                window.location.href = "/dashboard"
              },2000)

            }else if(result.status == 406){
      
              toast.warning(result.response.data)
            }
            else{
              toast.error('something went wrong , Please try again')
            }
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
                                <h2 className="text-dark fw-bold text-center text-md-start">Log In</h2>
                                <p className="text-muted text-center text-md-start">
                                    Welcome back! Please enter your details
                                </p>

                                <form>
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
                                        <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
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
                                            <input type="checkbox" id="rememberMe" />
                                            <label htmlFor="rememberMe" className="ms-2 text-muted">
                                                Remember me
                                            </label>
                                        </div>
                                        <a href="#" className="text-decoration-none text-primary">
                                            Forgot password?
                                        </a>
                                    </div>


                                    <button type='button'
                                        className="btn btn-primary w-100 mt-3"
                                        style={{ backgroundColor: "#8b5cf6", border: "none" }}
                                        onClick={handleUserLogin}
                                    >
                                        Log in
                                    </button>

                                </form>

                                {/* <div className="text-center my-3">Or Continue With</div>

                                <div className="d-flex justify-content-center gap-3">
                                    <button className="btn btn-light border d-flex align-items-center"  >
                                        <img
                                            src="https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj"
                                            alt="Google"
                                            width="30"
                                            height="30"
                                            className="me-2"
                                        />
                                        Google
                                    </button>

                                </div> */}

                                <p className="text-center mt-3 text-muted">
                                    Don't have an account?{" "}
                                    <a href="/register" className="text-primary">
                                        Sign up
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

export default Login