import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BoardItem from "../components/BoardItem";
import Header from "../components/Header";
import Pagenation from "../components/Pagenation";
import Title from "../components/Title";

import style from "./BoardListPage.module.css";

const BoardList = () => {
  const navigation = useNavigate();
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const itemList = useSelector((state) => {
    return state.board.board;
  });

  if (itemList.length < 0) {
    itemList = {};
  }

  const reverse = [...itemList].reverse();

  return (
    <>
      <Title title={"게시글 리스트"} />
      <Header />
      <main style={{ height: "490px" }} className={style.main}>
        {reverse.slice(offset, offset + limit).map((item) => (
          <ul key={item.id} className={style.ul}>
            <BoardItem itemList={item} />
          </ul>
        ))}
      </main>
      <div className={style.pagenation}>
        <Pagenation
          limit={limit}
          page={page}
          setPage={setPage}
          total={itemList.length}
        />
      </div>
      <footer style={{ textAlign: "center" }}>
        <button onClick={() => navigation("write")}>작성하기</button>
      </footer>
    </>
  );
};

export default BoardList;
