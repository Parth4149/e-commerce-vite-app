import "./style.css";
import BookIcon from "../../assets/BookIcon";

const Landing = () => (
  <section id="landing" className="section">
    <div className="section-center">
      <div className="header__description">
        <h1 className="primary-dark">most awarded online library platform</h1>
        <h2>
          Find your dream book with{" "}
          <span className="primary-dark">Library</span>
        </h2>
        <a href="#features">
          <button className="btn blue-gradient-bg">Browse books</button>
        </a>
      </div>
      <figure className="header__img--wrapper">
        <BookIcon />
      </figure>
    </div>
  </section>
);

export default Landing;
