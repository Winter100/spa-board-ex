import style from "./Header.module.css";
const Header = () => {
  return (
    <header className={style.container}>
      <h4 className={style.item}>번호</h4>
      <h4 className={style.item}>제목</h4>
      <h4 className={style.item}>작성일</h4>
      <h4 className={style.item}>작성자</h4>
    </header>
  );
};
export default Header;
