import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddDictionary from "./AddDictionary";
import MyDictionary from "./MyDictionary";
import NotFound from "./NotFound";
import { isLoaded, loadDictionaryFB } from "../redux/modules/dictionary";
import Spinner from "./Spinner"
import "./App.css";

function App() {
  const is_loaded = useSelector((state) => state.dictionary.is_loaded)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDictionaryFB(), isLoaded(false));
  }, [dispatch]);

  return (
    <div className="App">
      <Wrapper>
        <Routes>
          <Route path="/" exact element={<MyDictionary />} />
          <Route path="/add" element={<AddDictionary />} />
          <Route path="/update/:dictid" element={<AddDictionary />} />
          <Route element={NotFound} />
        </Routes>
      </Wrapper>
      {!is_loaded && <Spinner />}
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  max-width: 350px;
  min-height: 80vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;
