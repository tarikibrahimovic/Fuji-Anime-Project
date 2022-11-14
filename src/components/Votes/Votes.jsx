import { useEffect } from "react";
import { useState } from "react";

export default function Votes({ link }) {
  const [votes, setVotes] = useState(0);
  const [voted, setVoted] = useState();

  //   console.log(positive, negative);

  useEffect(() => {
    // link.forEach((el) => {
    //   if (el.votes.length !== 0) {
    // if (el.votes.vote === true) setVotes(votes + 1);
    // else setVotes(votes - 1)
    //   }
    // });
    // setVotes(positive + negative);

    if (link) {
      link.forEach((el) => {
        if (el.votes.vote === true) setVotes(votes + 1);
        else setVotes(votes - 1);
      });
    }
  }, []);

  return (
    <>
      {votes}
    </>
  );
}
