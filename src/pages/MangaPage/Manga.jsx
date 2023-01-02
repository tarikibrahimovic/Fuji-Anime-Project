import MangaCard from "../../components/MangaCard/MangaCard";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/scroll/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { createGlobalStyle } from "styled-components";
import ToTop from "../../components/ToTop/ToTop";

//style

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

function Manga() {
  const [manga, setManga] = useState([]);
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

  async function getManga() {
    let res;
    if (kategorija.length === 0 && naziv.length === 0) {
      res = await fetch(
        `https://kitsu.io/api/edge/manga?&page[limit]=20&page[offset]=${pomeraj}`
      );
    } else {
      if (naziv.length !== 0 && kategorija.length === 0) {
        res = await fetch(
          `https://kitsu.io/api/edge/manga?filter[text]=${naziv}&page[limit]=20&page[offset]=${pomeraj}`
        );
      } else if (value.length === 0 && kategorija.length !== 0) {
        res = await fetch(
          `https://kitsu.io/api/edge/manga?filter[categories]=${kategorija}&page[limit]=20&page[offset]=${pomeraj}`
        );
      } else {
        res = await fetch(
          `https://kitsu.io/api/edge/manga?filter[categories]=${kategorija}&filter[text]=${naziv}&page[limit]=20&page[offset]=${pomeraj}`
        );
      }
    }
    const data = await res.json();
    setManga((prevValue) => [...prevValue, ...data.data]);
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
    setManga([])
    pomeraj = 0;
    window.scrollTo({ top: 0 });
    getManga();
  }, [state]);

  useEffect(() => {
    promena === true ? setHasMore(true) : setHasMore(false);
  }, [promena]);

  useEffect(() => {
    setOffset(offset + 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manga]);

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
            setManga([]);
            pomeraj = 0;
            setOffset(-12);
            setValue(naziv);
            getManga();
          }}
        >
          <option selected>Choose category</option>
          <option value="adventure">Adventure</option>
          <option value="action">Action</option>
          <option value="fantasy">Fantasy</option>
          <option value="crime">Crmie</option>
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
        dataLength={manga.length}
        next={getManga}
        hasMore={hasMore}
        loader={<Loader className=" bg-dark" />}
        endMessage={
          <p className="text-center text-white">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ToTop />
        <div className="flex flex-wrap gap-8 justify-center bg-dark py-10">
          {manga.map((manga) => (
            <div
              key={manga.id}
              className="flex flex-wrap w-1/5 justify-center"
              onClick={() => {
                navigate(`${manga.attributes.canonicalTitle}/${manga.id}`, {
                  state: {
                    manga: manga,
                  },
                });
              }}
            >
              <MangaCard
                image={manga.attributes.posterImage.small}
                title={manga.attributes.canonicalTitle}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Manga;
