import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import style from "./Detail.module.css";
import { boardActions } from "../store/boardSlice";
import { useEffect, useState } from "react";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [author, setAuthor] = useState("");
  const [created, setCreated] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    const getFetch = async () => {
      try {
        const res = await fetch(
          "https://react-spa-board-default-rtdb.firebaseio.com/boarditem.json"
        );

        if (!res.ok) {
          throw new Error("디테일페이지 에러");
        }

        const data = await res.json();
        let findItem;
        for (const [key, value] of Object.entries(data)) {
          if (value.id === params.id) {
            value.key = key;
            findItem = value;
          }
        }

        // const item = Object.values(data).find((item) => item.id === params.id);

        setTitle(findItem.title);
        setContents(findItem.contents);
        setAuthor(findItem.author);
        setCreated(findItem.created);
        setKey(findItem.key);
      } catch (error) {
        console.log(error);
      }
    };

    getFetch();
  }, [params.id]);

  const navigation = useNavigate();

  const ovRemoveHandler = (key) => {
    const removeFetch = async () => {
      await fetch(
        `https://react-spa-board-default-rtdb.firebaseio.com/boarditem/${key}.json`,
        {
          method: "DELETE",
        }
      );
      dispatch(boardActions.removerItem(params.id));
      navigation("/", { replace: true });
    };
    (async () => {
      try {
        await removeFetch();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <Title title={"Detail페이지"} />

      <header className={style.title}>
        <h2>{title}</h2>
      </header>
      <div className={style.item}>
        <div className={style.items}>작성자: "{author}"</div>
        <div className={style.items}>작성일: "{created}"</div>
      </div>
      <main className={style.content}>
        <p className={style.contents}>{contents}</p>
      </main>
      <footer className={style.btn}>
        <button
          onClick={() => {
            navigation(-1);
          }}
        >
          홈으로
        </button>
        <button
          onClick={() => {
            navigation(`/edititem/${params.id}`);
          }}
        >
          수정
        </button>
        <button onClick={() => ovRemoveHandler(key)}>삭제</button>
      </footer>
    </>
  );
};

export default Detail;
