import { useEffect, useState, useRef } from "react";

import Footer from "../components/Footer";

import AppLogo from "../svgs/app-logo.svg";
import { useParams, useSearchParams } from "react-router-dom";

//icons
import { MdGamepad, MdTag } from "react-icons/md";
import { AiFillCamera, AiFillTrophy } from "react-icons/ai";
import { FaTheaterMasks } from "react-icons/fa";
import { FiBox } from "react-icons/fi";

const GameDetailsDescription = ({ description }) => {
  const [readMore, setReadMore] = useState(false);

  let descriptionString = description;

  return (
    <>
      <p className="description">
        {readMore === false && descriptionString.length > 200
          ? descriptionString.slice(0, 200) + "..."
          : descriptionString}
      </p>
      {readMore === false && descriptionString.length > 200 && (
        <button
          className="read-more-description"
          onClick={() => {
            setReadMore(true);
          }}
        >
          Read More
        </button>
      )}
    </>
  );
};

const GameDetailsLoadingSkeleton = () => {
  return (
    <>
      <div className="image-and-details-top">
        <div className="main-image game-details-loading-skeleton"></div>
        <div className="details-top">
          <div className="game-card-score game-details-loading-skeleton"></div>
          <h1 className="game-details-loading-skeleton">Lorem, ipsum.</h1>
          <h3 className="game-details-loading-skeleton">
            Lorem ipsum dolor sit amet.
          </h3>
          <div className="platforms game-details-loading-skeleton">
            Lorem ipsum dolor sit amet consectetur.
          </div>
          <div className="genres game-details-loading-skeleton">
            Lorem, ipsum dolor.
          </div>
        </div>
      </div>
    </>
  );
};

const GameDetails = () => {
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const scoreMovingPath = useRef();
  useEffect(async () => {
    setIsLoading(true);
    const data = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${process.env.REACT_APP_API_KEY}`
    );
    const response = await data.json();
    setGame(response);

    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, [searchParams]);

  const {
    background_image,
    developers,
    genres,
    metacritic,
    name,
    parent_platforms,
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
  }, [isLoading === false]);

  return (
    <>
      <section className="game-details-section">
        {isLoading || (
          <div
            className="game-details-bk-img"
            style={{
              backgroundImage: `linear-gradient(to bottom, #1b1f2780 0%,  #1b1f27 85%), url(${
                background_image ? background_image : AppLogo
              })`,
            }}
          ></div>
        )}

        {isLoading && <GameDetailsLoadingSkeleton />}

        {isLoading || (
          <>
            <div className="image-and-details-top">
              <div
                className="main-image"
                style={{
                  backgroundImage: `url(${
                    background_image ? background_image : AppLogo
                  })`,
                }}
              ></div>
              <div className="details-top">
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
                      data-moving-percent={
                        117 - (Number(metacritic) / 100) * 117
                      }
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
                <h1>{name}</h1>
                {developers?.[0]?.name && (
                  <h3>
                    <FiBox />
                    Developed by: {developers[0].name}
                  </h3>
                )}
                {parent_platforms.length > 0 && (
                  <div className="platforms">
                    <MdGamepad />
                    {parent_platforms.map((parentPlatform, i) => {
                      if (i > 4) return;

                      return (
                        <span className="platform" key={i}>
                          {parentPlatform.platform.name}
                        </span>
                      );
                    })}
                  </div>
                )}
                {genres?.length > 0 && (
                  <div className="genres">
                    <FaTheaterMasks />

                    {genres.map((genre, i) => (
                      <span className="genre" key={i}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <GameDetailsBottom game={game} gameId={gameId} />
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

const GameDetailsBottom = ({ game, gameId }) => {
  const [detailsType, setDetailsType] = useState("overview");
  const [achievements, setAchievements] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [achievementsPage, setAchievementsPage] = useState(1);
  const [isAchievementsLoading, setIsAchievementsLoading] = useState(true);
  const [isScreenshotsLoading, setIsScreenshotsLoading] = useState(true);

  const pageSize = 40;

  const fetchAchievements = async () => {
    setIsAchievementsLoading(true);

    const data = await fetch(
      `https://api.rawg.io/api/games/${gameId}/achievements?key=${process.env.REACT_APP_API_KEY}&page=${achievementsPage}&page_size=${pageSize}`
    );
    const response = await data.json();

    if (response.results.length > 0) {
      setTimeout(() => {
        setAchievements([...achievements, ...response.results]);
      }, 500);
    }

    if (response.next) {
      setAchievementsPage(achievementsPage + 1);
    } else {
      setAchievementsPage(null);
    }

    setTimeout(() => {
      setIsAchievementsLoading(false);
    }, 500);
  };

  const fetchScreenshots = async () => {
    setIsScreenshotsLoading(true);

    const data = await fetch(
      `https://api.rawg.io/api/games/${gameId}/screenshots?key=${process.env.REACT_APP_API_KEY}`
    );
    const response = await data.json();

    if (response?.results?.length > 0) {
      setScreenshots(response.results);
    }

    setTimeout(() => {
      setIsScreenshotsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (detailsType === "achievements" && achievements.length === 0) {
      fetchAchievements();
    }
  }, [detailsType]);

  useEffect(() => {
    if (detailsType === "screenshots" && screenshots.length === 0) {
      fetchScreenshots();
    }
  }, [detailsType]);

  const {
    playtime,
    publishers,
    ratings,
    released,
    tags,
    developers,
    description_raw,
    esrb_rating,
  } = game;

  return (
    <div className="details-bottom">
      <div className="details-bottom-navbar">
        <button
          className={detailsType === "overview" ? "active" : ""}
          onClick={() => setDetailsType("overview")}
        >
          Overview
        </button>
        <button
          className={detailsType === "achievements" ? "active" : ""}
          onClick={() => setDetailsType("achievements")}
        >
          <AiFillTrophy />
          Achievements
        </button>
        <button
          className={detailsType === "screenshots" ? "active" : ""}
          onClick={() => setDetailsType("screenshots")}
        >
          <AiFillCamera />
          Screenshots
        </button>
      </div>

      {detailsType === "overview" && (
        <>
          {tags?.length > 0 && (
            <div className="tags">
              <MdTag />

              {tags.map((tag, i) => {
                if (i > 5) return;

                return (
                  <span className="tag" key={i}>
                    {tag.name}
                  </span>
                );
              })}
            </div>
          )}

          {description_raw && (
            <GameDetailsDescription description={description_raw} />
          )}
          <div className="additional-info">
            {publishers?.length > 0 && (
              <div className="additional-info-wrapper">
                <h4 className="additional-info-title">Publishers</h4>
                <p className="additional-info-content">{publishers[0].name}</p>
              </div>
            )}
            {developers?.length > 0 && (
              <div className="additional-info-wrapper">
                <h4 className="additional-info-title">Developers</h4>
                <p className="additional-info-content">{developers[0].name}</p>
              </div>
            )}
            {released && (
              <div className="additional-info-wrapper">
                <h4 className="additional-info-title">Release Date</h4>
                <p className="additional-info-content">{released}</p>
              </div>
            )}
            {esrb_rating?.name && (
              <div className="additional-info-wrapper">
                <h4 className="additional-info-title">Maturity Rating</h4>
                <p className="additional-info-content">{esrb_rating.name}</p>
              </div>
            )}
            {playtime && (
              <div className="additional-info-wrapper">
                <h4 className="additional-info-title">Avg Playtime</h4>
                <p className="additional-info-content">{`${playtime}h`}</p>
              </div>
            )}
            {ratings?.[0] && (
              <div className="additional-info-wrapper">
                <h4 className="additional-info-title">Users Rating</h4>
                <p className="additional-info-content">{ratings[0].title}</p>
              </div>
            )}
          </div>
        </>
      )}
      {detailsType === "achievements" && (
        <div className="achievements-wrapper">
          {!isAchievementsLoading && achievements.length === 0 && (
            <h2 className="list-empty">No achievements available</h2>
          )}

          {achievements.map((item, index) => {
            const { name, description, image } = item;
            return (
              <div key={index} className="achievement">
                <img src={image} className="achievement-img" alt="" />
                <div className="achievement-name-description">
                  <h4 className="achievement-name">{name}</h4>
                  <p className="achievement-description">{description}</p>
                </div>
                <span className="achievement-number">{`#${index + 1}`}</span>
              </div>
            );
          })}

          {isAchievementsLoading && (
            <>
              <AchievementsLoadingSkeleton />
              <AchievementsLoadingSkeleton />
              <AchievementsLoadingSkeleton />
              <AchievementsLoadingSkeleton />
              <AchievementsLoadingSkeleton />
              <AchievementsLoadingSkeleton />
              <AchievementsLoadingSkeleton />
            </>
          )}

          {achievementsPage && (
            <button
              className="load-more-achievements"
              onClick={fetchAchievements}
            >
              Load more
            </button>
          )}
        </div>
      )}

      {detailsType === "screenshots" && (
        <div className="screenshots-wrapper">
          {isScreenshotsLoading && <ScreenshotsLoadingSkeleton />}

          {!isScreenshotsLoading && screenshots.length === 0 && (
            <h2 className="list-empty">No screenshots available</h2>
          )}

          {screenshots.length > 0 && (
            <div className="screenshots">
              {screenshots.map((screenshot, i) => {
                if (i > 5) return;
                return (
                  <div
                    key={i}
                    className="screenshot-image"
                    style={{
                      backgroundImage: `url(${screenshot.image})`,
                    }}
                  ></div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AchievementsLoadingSkeleton = () => {
  return (
    <div className="achievement loading">
      <div className="achievement-img game-details-loading-skeleton"></div>
      <div className="achievement-name-description">
        <h4 className="achievement-name game-details-loading-skeleton">
          Lorem, ipsum.
        </h4>
        <p className="achievement-description game-details-loading-skeleton">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut!
        </p>
      </div>
    </div>
  );
};

const ScreenshotsLoadingSkeleton = () => {
  return (
    <div className="screenshots">
      <div className="screenshot-image game-details-loading-skeleton"></div>
      <div className="screenshot-image game-details-loading-skeleton"></div>
      <div className="screenshot-image game-details-loading-skeleton"></div>
      <div className="screenshot-image game-details-loading-skeleton"></div>
      <div className="screenshot-image game-details-loading-skeleton"></div>
      <div className="screenshot-image game-details-loading-skeleton"></div>
    </div>
  );
};

export default GameDetails;
