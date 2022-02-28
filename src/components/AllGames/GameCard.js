import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

//icons

import { GiPolarStar } from "react-icons/gi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaRegMeh } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";

import AppLogo from "../../svgs/app-logo.svg";

const GameCard = ({ game, isLoading }) => {
  const scoreMovingPath = useRef();
  const [searchParams] = useSearchParams();

  const {
    name,
    id: gameId,
    parent_platforms,
    background_image,
    metacritic,
    genres,
    released,
    ratings,
  } = game;

  useEffect(() => {
    if (metacritic) {
      setTimeout(() => {
        if (scoreMovingPath.current) {
          scoreMovingPath.current.style.strokeDashoffset =
            scoreMovingPath.current.dataset.movingPercent;
        }
      }, 500);
    }
  }, []);

  const setRatingIcon = () => {
    let icon = "";

    if (ratings?.[0]?.title) {
      if (ratings[0].title === "exceptional") icon = <GiPolarStar />;
      if (ratings[0].title === "recommended") icon = <AiFillLike />;
      if (ratings[0].title === "meh") icon = <FaRegMeh />;
      if (ratings[0].title === "skip") icon = <AiFillDislike />;
    }

    return icon;
  };

  return (
    <div className="game-card">
      <div
        className="game-card-img"
        style={{
          backgroundImage: `url(${
            background_image ? background_image : AppLogo
          })`,
        }}
      ></div>
      <div className="game-card-top-info">
        <ul className="game-card-platforms">
          {parent_platforms.map((parentPlatform, i) => {
            if (i > 2) return;
            return <li key={i}>{parentPlatform.platform.name}</li>;
          })}
        </ul>
        <Link to={`/game-details/${gameId}`} className="game-card-name">{name}</Link>
        {metacritic && (
          <div className="game-card-score">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="18.5"
                stroke="#005174"
                strokeWidth="3"
              />
              <circle
                ref={scoreMovingPath}
                data-moving-percent={117 - (Number(metacritic) / 100) * 117}
                className="score-moving-path"
                cx="20"
                cy="20"
                r="18.5"
                stroke="#00B2FF"
                strokeWidth="3"
              />
            </svg>
            <span className="game-card-score-text">{metacritic}</span>
          </div>
        )}
      </div>

      <div className="game-card-bottom-info">
        {genres?.length > 0 && (
          <div className="additional-info">
            <h5 className="additional-info-title">Genres:</h5>
            <span className="additional-info-content">
              {genres.map((genre, i) => {
                if (i > 2) return;
                return i === genres.length - 1 || i === 2
                  ? ` ${genre.name}`
                  : ` ${genre.name},`;
              })}
            </span>
          </div>
        )}
        {released?.length > 0 && (
          <div className="additional-info">
            <h5 className="additional-info-title">Release Date:</h5>
            <span className="additional-info-content">{released}</span>
          </div>
        )}
        {ratings?.[0]?.title && (
          <div className="additional-info">
            <h5 className="additional-info-title">Users rated this:</h5>
            <span
              className={`additional-info-content ${
                ratings[0].title === "exceptional" ||
                ratings[0].title === "recommended"
                  ? "high-rating"
                  : "low-rating"
              }`}
            >
              {ratings[0].title}
              {setRatingIcon()}
            </span>
          </div>
        )}
        <Link className="more-details-btn" to={`/game-details/${gameId}`}>
          SEE MORE DETAILS <BiChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
