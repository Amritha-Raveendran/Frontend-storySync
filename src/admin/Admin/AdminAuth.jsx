import React from 'react'
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

function AdminAuth({ adminRegister }) {

  const linerGradientforRegister = "linear-gradient(to right,rgb(249, 136, 107),rgb(209, 80, 5))";

  const linerGradientforLogin = "linear-gradient(to right,rgb(5, 37, 106),rgb(82, 114, 192))";


  return (
    <>

      <div className="d-flex justify-content-center align-items-center vh-100 " style={{ backgroundImage: adminRegister ? linerGradientforRegister : linerGradientforLogin, backgroundSize: "cover" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded shadow-lg text-center w-25"
        >
          {!adminRegister ? <h2 className="mb-3 text-primary">Login Form </h2> :
            <h2 className="mb-3 text-warning">Register Form</h2>}



          <motion.div

            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >

            {adminRegister && <input
              type="text"
              placeholder="Username"
              className="form-control mb-2"
            />}


            <input
              type="email"
              placeholder="Email Address"
              className="form-control mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-2"
            />


            <a href="*" className="d-block text-dark mb-3 text-decoration-none">
              Forgot password?
            </a>


            {!adminRegister ? <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-100"

            >
              Sign In
            </motion.button>
              :


              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-warning w-100"

              >
                Sign up
              </motion.button>}

            {!adminRegister ? <p className="mt-3">
              Not a member ?
              <span
                className="text-primary cursor-pointer"
                style={{ cursor: "pointer" }}

              >
                <a href='/admin-register' style={{ textDecoration: "none" }}>
                  Sign up
                </a>

              </span>
            </p>
              :
              <p className="mt-3">
                Already have an account ?
                <span
                  className="text-primary cursor-pointer"
                  style={{ cursor: "pointer" }}

                >
                  <a href='/admin-login' style={{ textDecoration: "none" }} className='text-warning'>
                    Sign In
                  </a>

                </span>
              </p>}

          </motion.div>
        </motion.div>

      </div>

    </>
  )
}

export default AdminAuth