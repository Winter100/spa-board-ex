import { useRef } from "react";
import { useDispatch } from "react-redux";
import Title from "../components/Title";
import style from "./WritePage.module.css";
import { boardActions } from "../store/boardSlice";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { getUrl } from "../url";

const WritePage = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  const time = `${date.year}-${date.month}-${date.day}`;

  const title = useRef();
  const author = useRef();
  const password = useRef();
  const content = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const titleValue = title.current.value;
    const authorValue = author.current.value;
    const passwordValue = password.current.value;
    const contentValue = content.current.value;

    if (titleValue.trim().length === 0) {
      title.current.focus();
      return;
    }
    if (authorValue.trim().length <= 0) {
      author.current.focus();
      return;
    }
    if (passwordValue.trim().length <= 0) {
      password.current.focus();
      return;
    }
    if (contentValue.trim().length <= 0) {
      content.current.focus();
      return;
    }

    const addItem = {
      id: uuid(),
      title: titleValue,
      author: authorValue,
      created: time,
      contents: contentValue,
      password: passwordValue,
    };

    fetch(getUrl, {
      method: "POST",
      body: JSON.stringify(addItem),
    });

    dispatch(boardActions.setItem(addItem));
    navigation("/");
  };

  return (
    <>
      <Title title={"작성페이지"} />
      <div className={style.container}>
        <header>
          <input ref={title} className={style.title} id="title" type="text" />
        </header>
        <section className={style.section}>
          <div className={style.who}>
            <label htmlFor="author">작성자</label>
            <input ref={author} id="author" type="text" maxLength={"8"} />
          </div>
          <div className={style.who}>
            <label htmlFor="password">비밀번호</label>
            <input
              ref={password}
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
            ref={content}
            className={style.content}
            id="content"
            type="text"
          />
        </main>
        <form onSubmit={onSubmitHandler}>
          <button>등록</button>
        </form>
      </div>
    </>
  );
};

export default WritePage;
