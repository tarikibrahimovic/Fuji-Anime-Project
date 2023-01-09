import classes from "./MangaCard.module.css";

function MangaCard({ image, title }) {
  return (
    <div className="group flex justify-center hover:scale-105 transition ease-out relative max-w-sm bg-black cursor-pointer rounded-lg shadow-md hover:bg-gray-25 dark:bg-gray-800 dark:border-gray-700 dark:group-hover:bg-gray-900">
      <h1
      data-testid="manga-title"
      className="absolute text-xl text-white top-2 z-10 opacity-0 delay-150 group-hover:opacity-100"
      id={classes.naslov}>
        {title.length > 22 ? title.slice(0, 20) + "..." : title}
      </h1>
      <img
        src={image}
        alt="manga"
        className=" rounded-lg delay-150 group-hover:brightness-20"
      />
      <p className="absolute self-end bottom-5 text-white delay-150 z-10 opacity-0 group-hover:opacity-100" id={classes.more}>Click to see more</p>
    </div>
  );
}

export default MangaCard;
