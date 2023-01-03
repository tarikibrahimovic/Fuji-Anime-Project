import Logo from "../../img/fuji-logo.png";
import Poster from "../../img/all-anime-poster.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function Forgot() {
  
  let navigate = useNavigate();
  let status;
  const {id} = useParams();
  const [conPass, setConPass] = useState();
  const [pass, setPass] = useState();
  const [errors, setErrors] = useState();
  const link = process.env.REACT_APP_BACKEND_LINK;

  function Forgot(pass, confirmpass) {
    setErrors();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: id,
        password: pass,
        confirmPassword: confirmpass,
      }),
    };
    fetch(link + "User/reset-password", requestOptions)
    .then((res) => {
      status = res.status;
      console.log(res, status);
      return res.json();
    })
    .then((e) => {
      console.log(e);
      if(status === 200){
        navigate("/",{})
      }
      else{
        setErrors(e.errors);
      }
    })
    .catch((e) => console.log(e));
  }

  return (
    <section className="bg-dark w-full">
      <div>
        <img
          src={Poster}
          className="opacity-10 bg-cover absolute w-full h-full object-cover"
          alt="poster"
        />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a
            href="https"
            className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-10 h-10 mr-2" src={Logo} alt="logo" />
            Fuji
          </a>
          <div className="w-full bg-dark rounded-lg shadow-logored shadow-md border-logored border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Reset your password
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => {
                e.preventDefault();
                Forgot( pass, conPass);
              }}>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    placeholder="••••••••"
                    className={`bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full p-2.5 focus:outline-none ${(errors?.Password)? "border-lightred" : ""}`}
                    required=""
                  />
                  {errors?.Password?.map((e) => {
                    return (<p className="text-lightred">{e}</p>)
                  })}
                </div>
                <div>
                  <label
                    for="confirmpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    onChange={(e) => {
                      setConPass(e.target.value);
                    }}
                    placeholder="••••••••"
                    className={`bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full p-2.5 focus:outline-none ${(errors?.ConfirmPassword)? "border-lightred" : ""}`}
                    required=""
                  />
                  {errors?.ConfirmPassword?.map((e) => {
                    return (<p className="text-lightred">{e}</p>)
                  })}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100"
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Forgot;
