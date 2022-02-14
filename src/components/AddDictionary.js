import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { createDictionaryFB } from "../redux/modules/dictionary";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
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
    console.log(new_dictionary);
    dispatch(createDictionaryFB(new_dictionary));
    history.goBack();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>단어 추가하기</h1>
      <Line />
      <Box style={{ textAlign: "center" }}>
        <TextField
          fullWidth
          label="단어"
          type="text"
          ref={inputWord}
          margin="normal"
        />
        <TextField
          fullWidth
          label="설명"
          type="text"
          ref={inputMeaning}
          margin="normal"
        />
        <TextField
          fullWidth
          label="예시"
          type="text"
          ref={inputExample}
          margin="normal"
        />
        <Button variant="outlined" onClick={addDictionary}>
          추가하기
        </Button>
        <Button sx={{ margin: 1 }} color="secondary" variant="outlined" onClick={() => {history.goBack()}}>
          메인으로
        </Button>
      </Box>
    </div>
  );
};

export default AddDictionary;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #a60303;
`;
