import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AddDictionary from "./AddDictionary";
import MyDictionary from "./MyDictionary";
import NotFound from "./NotFound";
import UpdateDictionary from "./UpdateDictionary";
import { isLoaded, loadDictionaryFB } from "../redux/modules/dictionary";
import Spinner from "./Spinner"
import "./App.css";

function App(props) {
  const is_loaded = useSelector((state) => state.dictionary.is_loaded)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDictionaryFB(), isLoaded(false));
  }, [dispatch]);

  return (
    <div className="App">
      <Wrapper>
        <Switch>
          <Route path="/" exact component={MyDictionary} />
          <Route path="/dictionary" exact component={MyDictionary} />
          <Route path="/dictionary/add" component={AddDictionary} />
          <Route path="/dictionary/update" component={UpdateDictionary} />
          <Route component={NotFound} />
        </Switch>
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
