import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import { boardActions } from "../store/boardSlice";
import style from "./EditPage.module.css";
import { getUrl, putRemoveUrl } from "../url";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [author, setAuthor] = useState("");
  const [key, setKey] = useState("");
  const [created, setCreated] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const titleRef = useRef();
  const authorRef = useRef();
  const contentsRef = useRef();

  const params = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(getUrl);

        if (!res.ok) {
          throw new Error("에러발생");
        }
        const data = await res.json();
        console.log(data);

        let findItem;
        for (const [key, value] of Object.entries(data)) {
          if (value.id === params.id) {
            value.key = key;
            findItem = value;
          }
        }

        setCreated(findItem.created);
        setTitle(findItem.title);
        setContents(findItem.contents);
        setAuthor(findItem.author);
        setKey(findItem.key);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItem();
  }, [params.id]);

  const onPutHandler = (e) => {
    e.preventDefault();

    const titleValue = titleRef.current.value;
    const authorValue = authorRef.current.value;
    const contentValue = contentsRef.current.value;

    const addItem = {
      title: titleValue,
      author: authorValue,
      contents: contentValue,
      id: params.id,
      key: key,
      created: created,
    };

    fetch(putRemoveUrl(key), {
      method: "PUT",
      body: JSON.stringify(addItem),
    });

    dispatch(boardActions.editItem(addItem));
    navigation("/");
  };

  return (
    <>
      <Title title={"수정페이지"} />
      <div className={style.container}>
        <header>
          <input
            ref={titleRef}
            className={style.title}
            id="title"
            type="text"
            defaultValue={title}
          />
        </header>
        <section className={style.section}>
          <div className={style.who}>
            <label htmlFor="author">작성자</label>
            <input
              ref={authorRef}
              defaultValue={author}
              id="author"
              type="text"
              maxLength={"8"}
            />
          </div>
          <div className={style.who}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              minLength={"4"}
              maxLength={"8"}
            />
          </div>
        </section>
        <main>
          <div>
            <label htmlFor="content">본문</label>
          </div>
          <textarea
            ref={contentsRef}
            className={style.content}
            id="content"
            type="text"
            defaultValue={contents}
          />
        </main>
        <form onSubmit={onPutHandler}>
          <button>수정</button>
        </form>
      </div>
    </>
  );
};

export default EditPage;
