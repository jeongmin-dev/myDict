import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Card from "./Card";

const MyDictionary = (props) => {
  const navigate = useNavigate();
  const my_dictionary = useSelector((state) => state.dictionary.list);

  return (
    <>
      <Container>
        <h1>나만의 단어장</h1>
        <Line />
        {my_dictionary.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <h3>단어를 추가해 주세요</h3>
          </div>
        ) : (
          my_dictionary.map((dict) => {
            return <Card key={dict.id} post={dict} />;
          })
        )}
        <AddBtn>
          <Fab
            aria-label="add"
            onClick={() => {
              navigate("/add");
            }}
          >
            <AddIcon />
          </Fab>
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
  border: 1px dotted #8c4830;
`;
const AddBtn = styled.div`
  button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #d97904;
    color: #8c3a3a;
    svg {
      font-size: 40px;
    }
  }
  button::after {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
`;
