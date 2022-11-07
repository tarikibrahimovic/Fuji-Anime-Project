import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { FavoritesList } from "../../components/Context/Context";
import { Link } from "react-router-dom";

export default function AnimeInfo() {
  const { addToFavorites, removeFromFav, favItems } = useContext(FavoritesList);
  const { state } = useLocation();
  console.log(favItems, favItems.some((el) => el.id === state.anime.id && el.type === state.anime.type));

  return (
    <div className="flex flex-row justify-center items-start w-full h-full bg-dark text-white">
      <div className="flex flex-col w-1/4 justify-center items-center pt-4">
        <img className="rounded-lg w-64 cursor-pointer" src={state.anime.attributes.posterImage.small} alt=''/>
      </div>
      <div className="flex flex-col w-3/4 pt-4 gap-5 h-full">
        <div>
          <p className="text-4xl font-bold">{state.anime.attributes.canonicalTitle}</p>
          <br />
          <h4>{state.anime.attributes.description}</h4>
        </div>
        <div>
          <Link to="/anime">
          {favItems.some((el) => el.id === state.anime.id && el.type === state.anime.type) ? (
              <button
                className="bg-transparent py-2 px-4 font-semibold border hover:scale-105 hover:border-2 transition ease-out rounded"
                onClick={() => removeFromFav(state.anime)}
              >
                Remove from favorites
              </button>
            ) : (
              <button
                className="bg-transparent py-2 px-4 font-semibold border hover:scale-105 hover:border-2 transition ease-out rounded"
                onClick={() => addToFavorites(state.anime)}
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
