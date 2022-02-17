import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  createDictionaryFB,
  updateDictionaryFB,
} from "../redux/modules/dictionary";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";

const AddDictionary = ({post}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const inputWord = useRef();
  const inputMeaning = useRef();
  const inputExample = useRef();

  const type = location.pathname.split('/')[1]

  useEffect(() => {
    if (location.state !== null) {
      const {word, meaning, example} = location.state
      inputWord.current.value = word
      inputMeaning.current.value = meaning
      inputExample.current.value = example
    }
  }, [location.state]);

  let titleType;
  if (type === "update") {
    titleType = "수정";
  } else {
    titleType = "추가";
  }

  const addDictionary = () => {
    const new_dictionary = {
      word: inputWord.current.value,
      meaning: inputMeaning.current.value,
      example: inputExample.current.value,
    };
    if (type === "update") {
      dispatch(updateDictionaryFB(location.state.id, new_dictionary));
    } else {
      dispatch(createDictionaryFB(new_dictionary));
    }
    navigate("/");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>단어 {titleType}하기</h1>
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
          {titleType}하기
        </Button>
        <Button
          sx={{ margin: 1 }}
          color="secondary"
          variant="outlined"
          onClick={() => {
            navigate("/");
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
  border: 1px dotted #8c4830;
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
