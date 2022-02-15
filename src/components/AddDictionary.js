import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { createDictionaryFB } from "../redux/modules/dictionary";
import Button from "@mui/material/Button";

const AddDictionary = () => {
  const inputWord = useRef();
  const inputMeaning = useRef();
  const inputExample = useRef();

  const history = useHistory();
  const dispatch = useDispatch();

  const addDictionary = () => {
    const new_dictionary = {
      word: inputWord.current.value,
      meaning: inputMeaning.current.value,
      example: inputExample.current.value,
    };

    dispatch(createDictionaryFB(new_dictionary));
    history.goBack();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>단어 추가하기</h1>
      <Line />
      <Box>
        <div>
          <label>단어</label>
          <input type="text" ref={inputWord} />
        </div>
        <div>
          <label>설명</label>
          <input type="text" ref={inputMeaning} />
        </div>
        <div>
          <label>예시</label>
          <input type="text" ref={inputExample} />
        </div>
        <Button variant="outlined" onClick={addDictionary}>
          추가하기
        </Button>
        <Button
          sx={{ margin: 1 }}
          color="secondary"
          variant="outlined"
          onClick={() => {
            history.goBack();
          }}
        >
          메인으로
        </Button>
      </Box>
    </div>
  );
};

export default AddDictionary;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #5aadbf;
`;

const Box = styled.div`
  text-align: center;
  div {
    margin: 8px 0px;
    label {
      padding-right: 8px;
    }
    input {
      width: 280px;
      height: 80px;
    }
  }
`;
