import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import Loader from "../../components/scroll/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import ToTop from "../../components/ToTop/ToTop";

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: sans-serif;
}
`;

function Anime() {
  const [animes, setAnimes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  let kategorija = "";
  let naziv = "";
  let pomeraj = 0;
  const navigate = useNavigate();
  const { state } = useLocation();
  const [hasMore, setHasMore] = useState(true);
  const [promena, setPromena] = useState(true);

  let data;

  async function getAnimes() {
    let res;
    if (kategorija.length === 0 && naziv.length === 0) {
      res = await fetch(
        `https://kitsu.io/api/edge/anime?&page[limit]=20&page[offset]=${pomeraj}`
      );
    } else {
      if (naziv.length !== 0 && kategorija.length === 0) {
        res = await fetch(
          `https://kitsu.io/api/edge/anime?filter[text]=${naziv}&page[limit]=20&page[offset]=${pomeraj}`
        );
      } else if (naziv.length === 0 && kategorija.length !== 0) {
        res = await fetch(
          `https://kitsu.io/api/edge/anime?filter[categories]=${kategorija}&page[limit]=20&page[offset]=${pomeraj}`
        );
      } else {
        res = await fetch(
          `https://kitsu.io/api/edge/anime?filter[categories]=${kategorija}&filter[text]=${naziv}&page[limit]=20&page[offset]=${pomeraj}`
        );
      }
    }

    data = await res.json();
    setAnimes((prevValue) => [...prevValue, ...data.data]);
    if (data.data.length === 0) {
      setPromena(false);
    } else {
      setPromena(true);
    }
  }

  useEffect(() => {
    if (state?.category) {
      setCategory(state.category);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      kategorija = state.category;
    }
    if (state?.search) {
      setValue(state.search);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      naziv = state.search;
    }
    setOffset(0)
    setAnimes([])
    pomeraj = 0;
    window.scrollTo({ top: 0 });
    getAnimes();
  }, [state]);

  useEffect(() => {
    setOffset(offset + 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animes]);

  useEffect(() => {
    promena === true ? setHasMore(true) : setHasMore(false);
  }, [promena]);

  pomeraj = offset;
  naziv = value;
  kategorija = category;

  return (
    <div className="bg-dark">
      <div className="w-full flex justify-start">
        <select
          id="default"
          value={category}
          className="bg-dark h-10 w-1/3 border border-white text-grayish rounded-lg m-12"
          onChange={(e) => {
            kategorija = e.target.value;
            setCategory(kategorija);
            setAnimes([]);
            pomeraj = 0;
            setOffset(-12);
            setValue(naziv);
            getAnimes();
          }}
        >
          <option selected>Choose category</option>
          <option value="adventure">Adventure</option>
          <option value="action">Action</option>
          <option value="fantasy">Fantasy</option>
          <option value="crime">Crime</option>
          <option value="drama">Drama</option>
          <option value="romance">Romance</option>
          <option value="supernatural">Supernatural</option>
          <option value="magic">Magic</option>
          <option value="horror">Horror</option>
        </select>
      </div>
      <hr className="text-white w-11/12 m-auto"></hr>
      <GlobalStyle />

      <InfiniteScroll
        dataLength={animes.length}
        next={getAnimes}
        hasMore={hasMore}
        loader={<Loader className=" bg-dark" />}
        endMessage={
          <p className="text-center text-white">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="flex flex-wrap gap-8 justify-center bg-dark py-10 z-1">
          <ToTop />
          {animes.map((anime) => (
            <div
              key={anime.id}
              className="flex flex-wrap w-1/5 justify-center hover:bg-gray-25 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900"
              //context
              onClick={() => {
                navigate(`${anime.attributes.canonicalTitle}/${anime.id}`, {
                  state: {
                    anime: anime,
                  },
                });
              }}
            >
              <div></div>
              <AnimeCard
                image={anime.attributes.posterImage.small}
                title={anime.attributes.canonicalTitle}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Anime;
