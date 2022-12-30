import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import { NotificationManager } from "react-notifications";
import { FavoritesList } from "../Context/Context";

export default function Votes({ link }) {
  const [votes, setVotes] = useState(0);
  const [voted, setVoted] = useState(0);
  const [glasovi, setGlasovi] = useState(link.votes);
  const { isAuth, id, token } = useContext(FavoritesList);
  const [option, setOption] = useState();
  let positive = 0;
  let negative = 0;
  const url = process.env.REACT_APP_BACKEND_LINK;

  useEffect(() => {
    glasovi.forEach((el) => {
      if (el.userId === id) {
        if (el.vote === true) {
          setVoted(2);
        } else {
          setVoted(1);
        }
      }
      if (el.vote === true) positive++;
      else negative++;
    });

    setVotes(positive - negative);
  }, []);

  function Vote() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        linkId: link.id,
        idSadrzaja: link.idSadrzaja,
        tipsadrzaja: link.tipSadrzaja,
        vote: option,
      }),
    };
    fetch(url + "User/vote", requestOptions)
      .then((e) => {
        return e.json();
      })
      .then((res) => {
        NotificationManager.success("", "Succesfully voted!");
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className={`text-white text-center ml-3 mr-4 ${!isAuth && "m-auto"}`}>
      <VscTriangleUp
        className={`${!isAuth && "hidden"} ${
          voted === 2 && "text-logored"
        } opacity-80 hover:opacity-100 text-2xl`}
        onClick={(e) => {
          e.preventDefault();
          setOption(true);
          if(voted === 2){
            setVotes(votes - 1);
            setVoted(0);
          }
          else if(voted === 1){
            setVoted(2);
            setVotes(votes + 2);
          }
          else{
            setVoted(2);
            setVotes(votes + 1);
          }
          Vote();
        }}
      />
      {votes}
      <VscTriangleDown
        className={`${!isAuth && "hidden"} ${
          voted === 1 && "text-logored"
        } opacity-80 hover:opacity-100 text-2xl`}
        onClick={(e) => {
          e.preventDefault();
          setOption(false);
          if(voted === 2){
            setVotes(votes - 2);
            setVoted(1);
          }
          else if(voted === 1){
            setVoted(0);
            setVotes(votes + 1);
          }
          else{
            setVoted(1);
            setVotes(votes - 1);
          }
          Vote();
        }}
      />
    </div>
  );
}
