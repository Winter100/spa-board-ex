import { useNavigate } from "react-router-dom";
import style from "./BoardItem.module.css";

const BoardItem = ({ itemList }) => {
  const { title, created, author, index, id } = itemList;

  const navigation = useNavigate();
  return (
    <header className={style.container}>
      <div className={style.item}>{index}</div>
      <div
        onClick={() => navigation(`detailitem/${id}`)}
        className={`${style.item} ${style.title}`}
      >
        {title}
      </div>
      <div className={style.item}>{created}</div>
      <div className={style.item}>{author}</div>
    </header>
  );
};

export default BoardItem;
