import { useNavigate } from "react-router-dom";


export default function HomePoster({anime}) {
    const navigate = useNavigate();
    
    return (
        <div className="group relative rounded-lg transition ease-out delay-150 cursor-pointer"
        onClick={() => {
            navigate(`/anime/${anime.attributes.canonicalTitle}/${anime.id}`, {
              state: {
                anime: anime
              },
            });
          }}>
            <img src={anime.attributes.coverImage.large} alt='' className="group-hover:brightness-50 h-full transition ease-out delay-150"/>
            <h1 className="absolute drop-shadow-xl self-end top-5 ml-10 text-white text-3xl delay-150 z-0 opacity-0 group-hover:opacity-100">{anime.attributes.canonicalTitle}</h1>
            <h1 className="absolute drop-shadow-xl self-end top-16 ml-10 text-white text-xl delay-150 z-0 opacity-0 group-hover:opacity-100">Episodes: {anime.attributes.episodeCount}</h1>
            <h1 className="absolute drop-shadow-xl self-end top-24 ml-10 text-white text-xl delay-150 z-0 opacity-0 group-hover:opacity-100">Rating: {anime.attributes.averageRating}</h1>
        </div>
    )
}