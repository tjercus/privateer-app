import { Link } from "react-router-dom";

export const HomeView = () => (
  <article>
    <h1>{"Backoffice home"}</h1>
    <p>{"There are two flavours to try"}</p>
    <ol>
      <li>
        <Link to={"/hardware"}>{"an offline feature"}</Link>{" "}
        {"which is probably less common"}
      </li>
      <li>
        <Link to={"/planets"}>{"an online relational feature (planets)"}</Link>
      </li>
      <li>
        <Link to={"/spaceship"}>
          {"an online relational feature (spaceships)"}
        </Link>
      </li>
    </ol>
  </article>
);
