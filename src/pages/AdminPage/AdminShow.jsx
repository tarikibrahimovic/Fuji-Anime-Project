import { useContext } from "react"
import { FavoritesList } from "../../components/Context/Context"
import { NotificationManager } from "react-notifications";

export default function AdminShow({ data, getAdmin }) {
    const {id} = useContext(FavoritesList);

    async function deleteAdmin(){
        let requestOptions = {
            method: "Delete",
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          };
          try {
            let res = await fetch(
              `https://localhost:7098/api/User/admin-delete?id=${data.id}`,
              requestOptions
            );
            res = await res.json();
            NotificationManager.success("", res.message);
            getAdmin()
          } catch (error) {
            console.log(error);
          }
      }

  return (
    <div className="flex text-white border border-white">
      <p className="mx-2 my-1 w-full">User Id: {data.id}</p>
      <p className="mx-2 my-1 w-full">User Username: {data.username}</p>
      <p className="mx-2 my-1 w-full">User Email: {data.email}</p>
      <p className="mx-2 my-1 w-full">
        User is Varified At: {data.verifiedAt?.slice(0, 10)}
      </p>
      {(data.id != id)&&(<div class="flex space-x-2 justify-center">
        <button
          type="button"
          class="inline-block px-6 py-2.5 bg-logored opacity-90 text-white font-medium text-xs leading-tight uppercase rounded shadow-md mx-2 my-1
           hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 hover:opacity-100 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e) => {
                e.preventDefault();
                deleteAdmin();
            }}
        >
          Delete User
        </button>
      </div>)}
    </div>
  );
}
