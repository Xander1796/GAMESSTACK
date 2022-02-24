import { IoGameController } from "react-icons/io5";
import gameSectionImg from "../images/game-section-img.jpg";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-section-background"></div>
        <section className="home-section">
          <div className="home-section-cta-wrapper">
            <h3>PLAY MORE, BE HAPPY</h3>
            <h1>
              THE LATEST GAMES ONLY ON <span>GAMES-STACK</span>
            </h1>
            <Link to="/games">
              <IoGameController />
              SEE GAMES
            </Link>
          </div>

          <div className="home-section-banner-bottom">
            <div className="banner"></div>
            <img src={gameSectionImg} alt="" />
          </div>
        </section>
    </>
  );
};

export default Home;
