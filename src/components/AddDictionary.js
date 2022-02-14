import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createDictionaryFB } from "../redux/modules/dictionary";

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
      <h1>단어 추가하기</h1>
      <div>
        <label>단어</label>
        <input type="text" ref={inputWord} />
        <label>설명</label>
        <input type="text" ref={inputMeaning} />
        <label>예시</label>
        <input type="text" ref={inputExample} />
        <button onClick={addDictionary}>추가하기</button>
      </div>
    </div>
  );
};

export default AddDictionary;
