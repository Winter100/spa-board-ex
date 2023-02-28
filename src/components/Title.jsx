import style from "./Title.module.css";
const Title = ({ title }) => {
  return <h1 className={style.Title}>{title}</h1>;
};

export default Title;
