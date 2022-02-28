import React, { useState } from "react";

import GameCardsPagination from "./GameCardsPagination";

//components
import GameCards from "./GameCards";
import GamesActionsBar from "./GamesActionsBar";

const AllGames = () => {
  const [gridType, setGridType] = useState("multi-column");
  const [games, setGames] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div id="games">
      <GamesActionsBar setGridType={setGridType} />
      <GameCards
        gridType={gridType}
        games={games}
        setGames={setGames}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <GameCardsPagination
        games={games}
        pagination={pagination}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AllGames;
