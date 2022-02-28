import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { IoGameControllerSharp } from "react-icons/io5";
import { v4 as uuid } from "uuid";

import API_KEY from "../../api_key";

//components
import GameCard from "./GameCard";

const GameLoadingCard = () => {
  return <div className="game-card-skeleton"></div>;
};

const GameCards = ({
  gridType,
  games,
  setGames,
  setPagination,
  isLoading,
  setIsLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(async () => {
    setIsLoading(true);

    const checkIfFilterExists = () => {
      let filters = Object.fromEntries([...searchParams]);
      let query = "";

      if (Object.keys(filters).length > 0) {
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        keys.forEach((key, i) => {
          query += `&${key === "q" ? "search" : key}=${values[i]}`;
        });
      } else {
        query = "";
      }
      return query;
    };

    const data = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}${checkIfFilterExists()}&metacritic=60, 100&page_size=40`
    );
    const response = await data.json();
    setGames(response.results);
    setPagination({
      nextPage: response.next,
      prevPage: response.previous,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, [searchParams, useSearchParams]);

  return (
    <div className={`game-cards ${gridType}`}>
      {isLoading === true && (
        <>
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
          <GameLoadingCard />
        </>
      )}
      {isLoading === false && games.length === 0 && (
        <h2 className="no-results">
          <IoGameControllerSharp />
          No results
        </h2>
      )}

      {isLoading === false &&
        games.length > 0 &&
        games.map((game) => {
          const uniqueId = uuid()
          return <GameCard key={uniqueId} game={game} isLoading={isLoading} />;
        })}
    </div>
  );
};

export default GameCards;
