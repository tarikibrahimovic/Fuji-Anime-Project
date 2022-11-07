import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { FavoritesList } from "../../components/Context/Context";
import { Link } from "react-router-dom";

export default function MangaInfo() {
  const { addToFavorites, removeFromFav, favItems } = useContext(FavoritesList);
  const { state } = useLocation();
  const description = state.description;
  return (
    <div className="flex flex-row justify-center items-start w-full h-full bg-dark text-white">
      <div className="flex flex-col w-1/4 justify-center items-center pt-4">
        <img className="rounded-lg w-64 cursor-pointer" src={state.manga.attributes.posterImage.small} alt=''/>
      </div>
      <div className="flex flex-col w-3/4 pt-4 gap-5 h-full">
        <div>
          <p className="text-4xl font-bold">{state.manga.attributes.canonicalTitle}</p>
          <br />
          <h4>{state.manga.attributes.description}</h4>
        </div>
        <div>
          <Link to="/manga">
            {favItems.find((el) => el.id === state.manga.id && el.attributes.canonicalTitle === state.manga.attributes.canonicalTitle) ? (
              <button
                className="bg-transparent py-2 px-4 font-semibold border hover:scale-105 hover:border-2 transition ease-out rounded"
                onClick={() => removeFromFav(state.manga)}
              >
                Remove from favorites
              </button>
            ) : (
              <button
                className="bg-transparent py-2 px-4 font-semibold border hover:scale-105 hover:border-2 transition ease-out rounded"
                onClick={() => addToFavorites(state.manga)}
              >
                Add to favorites
              </button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
