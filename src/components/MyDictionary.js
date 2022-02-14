import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const MyDictionary = (props) => {
  const history = useHistory();
  const my_dictionary = useSelector((state) => state.dictionary.list);

  return (
    <>
      <Container>
        <h1>My Dictionary</h1>
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
        <AddBtn
          onClick={() => {
            history.push("/dictionary/add");
          }}
        >
          +
        </AddBtn>
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
  border: 1px dotted #a60303;
`;
const Card = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: #f2efeb;
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

const AddBtn = styled.button`
  display: inline-block;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 64px;
  height: 64px;
  background-color: #0a6abf;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 48px;
  border-radius: 50%;
`;
