import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDictionaryFB } from "../redux/modules/dictionary";

const MyDictionary = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const my_dictionary = useSelector((state) => state.dictionary.list);

  return (
    <>
      <Container>
        <h1>나만의 단어장</h1>
        <Line />
        {my_dictionary.length === 0 ? (
          <div>단어를 추가해 주세요</div>
        ) : (
          my_dictionary.map((dict, idx) => {
            return (
              <Card key={idx}>
                <div>
                  <label>단어</label>
                  <p>{dict.word}</p>
                  <label>설명</label>
                  <p>{dict.meaning}</p>
                  <label>예시</label>
                  <p>{dict.example}</p>
                </div>
                <ActionBox>
                  <EditIcon
                    style={{ color: "#A6449F", cursor: "pointer" }}
                    onClick={() => {
                      history.push("/dictionary/update/" + idx);
                    }}
                  />
                  <DeleteIcon
                    style={{ color: "#A6449F", cursor: "pointer" }}
                    onClick={() => {
                      alert("삭제하시겠습니까?")
                      dispatch(deleteDictionaryFB(dict.id));
                    }}
                  />
                </ActionBox>
              </Card>
            );
          })
        )}

        <Fab
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#F27405",
            color: "#F2F2F2",
          }}
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
  border: 1px dotted #400f04;
`;
const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 8px;
  background-color: #F29F05;
  border: 1px solid #A6449F;
  label {
    font-size: 12px;
    text-decoration: underline;
  }
  p {
    margin: 0;
    margin-bottom: 8px;
  }
  p:last-child {
    color: #5E7EBF;
  }
`;

const ActionBox = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;
