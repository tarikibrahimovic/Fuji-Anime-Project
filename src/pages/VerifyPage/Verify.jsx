import { useNavigate, useParams } from "react-router-dom";

function Verify() {

    let {id} = useParams();
    const navigate = useNavigate();
    let status;
    const link = process.env.REACT_APP_BACKEND_LINK;
    function Verify() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               Token: id
          }),
          };
          fetch(link + "User/verify", requestOptions)
          .then((res) => {
            status = res.status
            console.log(res, status, id);
            return res.json();
          }).then((e) => {
            console.log(e);
            if(status === 200)
                navigate('/',{});
          })
          .catch(e => console.log(e))
        };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-dark min-w-screen">
      <div className="max-w-xl p-8 text-center text-white bg-dark shadow-xl lg:max-w-3xl rounded-3xl lg:p-12 border border-logored ">
        <h3 className="text-2xl">Thanks for signing up on Fuji</h3>
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </div>

        <p>We're happy you're here. Let's get your email address verified:</p>
        <div className="mt-4">
          <button
            className="px-2 py-2 text-blue-200 bg-logored opacity-90 hover:opacity-100 rounded"
            onClick={(e) => {
              e.preventDefault();
              Verify();
            }}
          >
            Click to Verify Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verify;
