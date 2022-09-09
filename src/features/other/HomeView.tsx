import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HomeView = () => {
  const { t } = useTranslation();
  return (
    <article>
      <h1>{t("home.header")}</h1>
      <p>{t("home.intro")}</p>
      <ol>
        <li>
          <Link to={"/hardware"}>{t("home.link1")}</Link>
        </li>
        <li>
          <Link to={"/planet"}>{t("home.link2")}</Link>
        </li>
        <li>
          <Link to={"/spaceship"}>{t("home.link3")}</Link>
        </li>
      </ol>
    </article>
  );
};
