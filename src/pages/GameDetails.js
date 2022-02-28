import { useEffect, useState, useRef } from "react";

import AppLogo from "../svgs/app-logo.svg";
import { useParams, useSearchParams } from "react-router-dom";

import API_KEY from "../api_key";

import { v4 as uuid } from "uuid";

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
  const [game, setGame] = useState({
    id: 3328,
    slug: "the-witcher-3-wild-hunt",
    name: "The Witcher 3: Wild Hunt",
    name_original: "The Witcher 3: Wild Hunt",
    description:
      "<p>The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately, this time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side. Great attention to the world building above all creates an immersive story, where your decisions will shape the world around you.</p>\n<p>CD Project Red are infamous for the amount of work they put into their games, and it shows, because aside from classic third-person action RPG base game they provided 2 massive DLCs with unique questlines and 16 smaller DLCs, containing extra quests and items.</p>\n<p>Players praise the game for its atmosphere and a wide open world that finds the balance between fantasy elements and realistic and believable mechanics, and the game deserved numerous awards for every aspect of the game, from music to direction.</p>",
    metacritic: 92,
    metacritic_platforms: [
      {
        metascore: 91,
        url: "https://www.metacritic.com/game/xbox-one/the-witcher-3-wild-hunt",
        platform: {
          platform: 1,
          name: "Xbox One",
          slug: "xbox-one",
        },
      },
      {
        metascore: 93,
        url: "https://www.metacritic.com/game/pc/the-witcher-3-wild-hunt",
        platform: {
          platform: 4,
          name: "PC",
          slug: "pc",
        },
      },
      {
        metascore: 92,
        url: "https://www.metacritic.com/game/playstation-4/the-witcher-3-wild-hunt",
        platform: {
          platform: 18,
          name: "PlayStation 4",
          slug: "playstation4",
        },
      },
    ],
    released: "2015-05-18",
    tba: false,
    updated: "2022-01-02T10:49:58",
    background_image:
      "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    background_image_additional:
      "https://media.rawg.io/media/screenshots/3e4/3e4576a772b3df47bfc52b86e4cf7e03.jpg",
    website: "https://thewitcher.com/en/witcher3",
    rating: 4.67,
    rating_top: 5,
    ratings: [
      {
        id: 5,
        title: "exceptional",
        count: 3972,
        percent: 77.96,
      },
      {
        id: 4,
        title: "recommended",
        count: 798,
        percent: 15.66,
      },
      {
        id: 3,
        title: "meh",
        count: 205,
        percent: 4.02,
      },
      {
        id: 1,
        title: "skip",
        count: 120,
        percent: 2.36,
      },
    ],
    reactions: {
      1: 49,
      2: 10,
      3: 47,
      4: 24,
      5: 13,
      6: 9,
      7: 13,
      10: 14,
      11: 16,
      12: 17,
      14: 1,
      15: 1,
      16: 2,
      21: 1,
    },
    added: 15455,
    added_by_status: {
      yet: 847,
      owned: 8998,
      beaten: 3579,
      toplay: 626,
      dropped: 662,
      playing: 743,
    },
    playtime: 48,
    screenshots_count: 107,
    movies_count: 0,
    creators_count: 34,
    achievements_count: 684,
    parent_achievements_count: 49,
    reddit_url: "https://www.reddit.com/r/thewitcher3/",
    reddit_name: "r/thewitcher3",
    reddit_description:
      "A subreddit for veterans and new fans alike of The Witcher 3: Wild Hunt as well as for other Witcher games and the franchise in general. Everyone is welcome.",
    reddit_logo: "",
    reddit_count: 8204,
    twitch_count: 112,
    youtube_count: 1000000,
    reviews_text_count: 73,
    ratings_count: 5022,
    suggestions_count: 673,
    alternative_names: [],
    metacritic_url:
      "https://www.metacritic.com/game/playstation-4/the-witcher-3-wild-hunt",
    parents_count: 0,
    additions_count: 3,
    game_series_count: 6,
    user_game: null,
    reviews_count: 5095,
    saturated_color: "0f0f0f",
    dominant_color: "0f0f0f",
    parent_platforms: [
      {
        platform: {
          id: 1,
          name: "PC",
          slug: "pc",
        },
      },
      {
        platform: {
          id: 2,
          name: "PlayStation",
          slug: "playstation",
        },
      },
      {
        platform: {
          id: 3,
          name: "Xbox",
          slug: "xbox",
        },
      },
      {
        platform: {
          id: 7,
          name: "Nintendo",
          slug: "nintendo",
        },
      },
    ],
    platforms: [
      {
        platform: {
          id: 18,
          name: "PlayStation 4",
          slug: "playstation4",
          image: null,
          year_end: null,
          year_start: null,
          games_count: 6242,
          image_background:
            "https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg",
        },
        released_at: "2015-05-18",
        requirements: {},
      },
      {
        platform: {
          id: 4,
          name: "PC",
          slug: "pc",
          image: null,
          year_end: null,
          year_start: null,
          games_count: 414392,
          image_background:
            "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg",
        },
        released_at: "2015-05-18",
        requirements: {},
      },
      {
        platform: {
          id: 1,
          name: "Xbox One",
          slug: "xbox-one",
          image: null,
          year_end: null,
          year_start: null,
          games_count: 5168,
          image_background:
            "https://media.rawg.io/media/games/c24/c24ec439abf4a2e92f3429dfa83f7f94.jpg",
        },
        released_at: "2015-05-18",
        requirements: {},
      },
      {
        platform: {
          id: 186,
          name: "Xbox Series S/X",
          slug: "xbox-series-x",
          image: null,
          year_end: null,
          year_start: 2020,
          games_count: 403,
          image_background:
            "https://media.rawg.io/media/games/5eb/5eb49eb2fa0738fdb5bacea557b1bc57.jpg",
        },
        released_at: "2015-05-18",
        requirements: {},
      },
      {
        platform: {
          id: 187,
          name: "PlayStation 5",
          slug: "playstation5",
          image: null,
          year_end: null,
          year_start: 2020,
          games_count: 465,
          image_background:
            "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg",
        },
        released_at: "2015-05-18",
        requirements: {},
      },
      {
        platform: {
          id: 7,
          name: "Nintendo Switch",
          slug: "nintendo-switch",
          image: null,
          year_end: null,
          year_start: null,
          games_count: 4695,
          image_background:
            "https://media.rawg.io/media/games/9dd/9ddabb34840ea9227556670606cf8ea3.jpg",
        },
        released_at: "2015-05-18",
        requirements: {},
      },
    ],
    stores: [
      {
        id: 354780,
        url: "",
        store: {
          id: 5,
          name: "GOG",
          slug: "gog",
          domain: "gog.com",
          games_count: 3963,
          image_background:
            "https://media.rawg.io/media/games/5c0/5c0dd63002cb23f804aab327d40ef119.jpg",
        },
      },
      {
        id: 3565,
        url: "",
        store: {
          id: 3,
          name: "PlayStation Store",
          slug: "playstation-store",
          domain: "store.playstation.com",
          games_count: 7725,
          image_background:
            "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg",
        },
      },
      {
        id: 305376,
        url: "",
        store: {
          id: 1,
          name: "Steam",
          slug: "steam",
          domain: "store.steampowered.com",
          games_count: 60093,
          image_background:
            "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg",
        },
      },
      {
        id: 312313,
        url: "",
        store: {
          id: 2,
          name: "Xbox Store",
          slug: "xbox-store",
          domain: "microsoft.com",
          games_count: 4684,
          image_background:
            "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
        },
      },
      {
        id: 676022,
        url: "",
        store: {
          id: 6,
          name: "Nintendo Store",
          slug: "nintendo",
          domain: "nintendo.com",
          games_count: 8799,
          image_background:
            "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg",
        },
      },
    ],
    developers: [
      {
        id: 9023,
        name: "CD PROJEKT RED",
        slug: "cd-projekt-red",
        games_count: 16,
        image_background:
          "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
      },
    ],
    genres: [
      {
        id: 4,
        name: "Action",
        slug: "action",
        games_count: 141834,
        image_background:
          "https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg",
      },
      {
        id: 3,
        name: "Adventure",
        slug: "adventure",
        games_count: 106193,
        image_background:
          "https://media.rawg.io/media/games/4e6/4e6e8e7f50c237d76f38f3c885dae3d2.jpg",
      },
      {
        id: 5,
        name: "RPG",
        slug: "role-playing-games-rpg",
        games_count: 43265,
        image_background:
          "https://media.rawg.io/media/games/c24/c24ec439abf4a2e92f3429dfa83f7f94.jpg",
      },
    ],
    tags: [
      {
        id: 31,
        name: "Singleplayer",
        slug: "singleplayer",
        language: "eng",
        games_count: 151210,
        image_background:
          "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
      },
      {
        id: 13,
        name: "Atmospheric",
        slug: "atmospheric",
        language: "eng",
        games_count: 19520,
        image_background:
          "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg",
      },
      {
        id: 40836,
        name: "Full controller support",
        slug: "full-controller-support",
        language: "eng",
        games_count: 11484,
        image_background:
          "https://media.rawg.io/media/games/588/588c6bdff3d4baf66ec36b1c05b793bf.jpg",
      },
      {
        id: 42,
        name: "Great Soundtrack",
        slug: "great-soundtrack",
        language: "eng",
        games_count: 3188,
        image_background:
          "https://media.rawg.io/media/games/16b/16b1b7b36e2042d1128d5a3e852b3b2f.jpg",
      },
      {
        id: 24,
        name: "RPG",
        slug: "rpg",
        language: "eng",
        games_count: 13712,
        image_background:
          "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
      },
      {
        id: 118,
        name: "Story Rich",
        slug: "story-rich",
        language: "eng",
        games_count: 13335,
        image_background:
          "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg",
      },
      {
        id: 36,
        name: "Open World",
        slug: "open-world",
        language: "eng",
        games_count: 4757,
        image_background:
          "https://media.rawg.io/media/games/c6b/c6bfece1daf8d06bc0a60632ac78e5bf.jpg",
      },
      {
        id: 149,
        name: "Third Person",
        slug: "third-person",
        language: "eng",
        games_count: 6253,
        image_background:
          "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg",
      },
      {
        id: 64,
        name: "Fantasy",
        slug: "fantasy",
        language: "eng",
        games_count: 17750,
        image_background:
          "https://media.rawg.io/media/games/b6b/b6b20bfc4b34e312dbc8aac53c95a348.jpg",
      },
      {
        id: 37,
        name: "Sandbox",
        slug: "sandbox",
        language: "eng",
        games_count: 4504,
        image_background:
          "https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg",
      },
      {
        id: 97,
        name: "Action RPG",
        slug: "action-rpg",
        language: "eng",
        games_count: 4327,
        image_background:
          "https://media.rawg.io/media/games/530/5302dd22a190e664531236ca724e8726.jpg",
      },
      {
        id: 41,
        name: "Dark",
        slug: "dark",
        language: "eng",
        games_count: 9783,
        image_background:
          "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg",
      },
      {
        id: 44,
        name: "Nudity",
        slug: "nudity",
        language: "eng",
        games_count: 3385,
        image_background:
          "https://media.rawg.io/media/games/447/4470c1e76f01acfaf5af9c207d1c1c92.jpg",
      },
      {
        id: 336,
        name: "controller support",
        slug: "controller-support",
        language: "eng",
        games_count: 294,
        image_background:
          "https://media.rawg.io/media/games/b6b/b6b20bfc4b34e312dbc8aac53c95a348.jpg",
      },
      {
        id: 192,
        name: "Mature",
        slug: "mature",
        language: "eng",
        games_count: 1302,
        image_background:
          "https://media.rawg.io/media/games/13a/13a528ac9cf48bbb6be5d35fe029336d.jpg",
      },
      {
        id: 145,
        name: "Choices Matter",
        slug: "choices-matter",
        language: "eng",
        games_count: 1943,
        image_background:
          "https://media.rawg.io/media/games/07a/07a74470a2618fd71945db0619602baf.jpg",
      },
      {
        id: 40,
        name: "Dark Fantasy",
        slug: "dark-fantasy",
        language: "eng",
        games_count: 2189,
        image_background:
          "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
      },
      {
        id: 66,
        name: "Medieval",
        slug: "medieval",
        language: "eng",
        games_count: 3780,
        image_background:
          "https://media.rawg.io/media/games/ccf/ccf26f6e3d553a04f0033a8107a521b8.jpg",
      },
      {
        id: 82,
        name: "Magic",
        slug: "magic",
        language: "eng",
        games_count: 6111,
        image_background:
          "https://media.rawg.io/media/games/21a/21ad672cedee9b4378abb6c2d2e626ee.jpg",
      },
      {
        id: 218,
        name: "Multiple Endings",
        slug: "multiple-endings",
        language: "eng",
        games_count: 4658,
        image_background:
          "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg",
      },
    ],
    publishers: [
      {
        id: 7411,
        name: "CD PROJEKT RED",
        slug: "cd-projekt-red",
        games_count: 16,
        image_background:
          "https://media.rawg.io/media/games/742/7424c1f7d0a8da9ae29cd866f985698b.jpg",
      },
    ],
    esrb_rating: {
      id: 4,
      name: "Mature",
      slug: "mature",
    },
    clip: null,
    description_raw:
      "The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately, this time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side. Great attention to the world building above all creates an immersive story, where your decisions will shape the world around you.\n\nCD Project Red are infamous for the amount of work they put into their games, and it shows, because aside from classic third-person action RPG base game they provided 2 massive DLCs with unique questlines and 16 smaller DLCs, containing extra quests and items.\n\nPlayers praise the game for its atmosphere and a wide open world that finds the balance between fantasy elements and realistic and believable mechanics, and the game deserved numerous awards for every aspect of the game, from music to direction.",
  });
  const [isLoading, setIsLoading] = useState(false);

  const scoreMovingPath = useRef();
  useEffect(async () => {
    setIsLoading(true);
    const data = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
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
      `https://api.rawg.io/api/games/${gameId}/achievements?key=${API_KEY}&page=${achievementsPage}&page_size=${pageSize}`
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
      `https://api.rawg.io/api/games/${gameId}/screenshots?key=${API_KEY}`
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
