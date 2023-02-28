import "./App.css";
import { Routes, Route } from "react-router-dom";
import BoardList from "./pages/BoardListPage";
import Card from "./Card/Card";
import Write from "./pages/WritePage";
import Detail from "./pages/Detail";
import EditPage from "./pages/EditPage";
import { useLayoutEffect } from "react";
import { asyncGetItemList } from "./store/boardSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(asyncGetItemList());
  }, []);

  return (
    <Card>
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detailitem/:id" element={<Detail />} />
        <Route path="/edititem/:id" element={<EditPage />} />
      </Routes>
    </Card>
  );
}

export default App;
