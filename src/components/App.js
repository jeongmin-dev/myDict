import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AddDictionary from "./AddDictionary";
import MyDictionary from "./MyDictionary";
import NotFound from "./NotFound";
import { loadDictionaryFB } from "../redux/modules/dictionary";
import "./App.css";

function App(props) {
  console.log("index.js: ", props);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDictionaryFB());
  }, []);

  return (
    <div className="App">
      <Wrapper>
        <Switch>
          <Route path="/" exact component={MyDictionary} />
          <Route path="/dictionary" exact component={MyDictionary} />
          <Route path="/dictionary/add" component={AddDictionary} />
          <Route component={NotFound} />
        </Switch>
      </Wrapper>
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
