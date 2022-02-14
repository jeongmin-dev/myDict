import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const MyDictionary = (props) => {
  const history = useHistory();
  const my_dictionary = useSelector((state) => state.dictionary.list);

  return (
    <>
      <Container>
        <h1>나만의 단어장</h1>
        <Line />
        {my_dictionary.map((dict, idx) => {
          return (
            <Card key={idx}>
              <label>단어</label>
              <p>{dict.word}</p>
              <label>설명</label>
              <p>{dict.meaning}</p>
              <label>예시</label>
              <p>{dict.example}</p>
            </Card>
          );
        })}
        <Fab
          style={{ position: "absolute", bottom: "20px", right: "20px" }}
          color="primary"
          aria-label="add"
          onClick={() => {
            history.push("/dictionary/add");
          }}
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
};

export default MyDictionary;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  h1 {
    text-align: center;
    margin: 8px 0px;
  }
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #5aadbf;
`;
const Card = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: #bdd9f2;
  border: 1px solid #0a6abf;
  label {
    font-size: 12px;
    text-decoration: underline;
  }
  p {
    margin: 0;
    margin-bottom: 8px;
  }
  p:last-child {
    color: #0a6abf;
  }
`;
