import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { deleteDictionaryFB } from "../redux/modules/dictionary";

const Card = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, word, meaning, example } = post;

  return (
    <Post>
      <div>
        <label>단어</label>
        <p>{word}</p>
        <label>설명</label>
        <p>{meaning}</p>
        <label>예시</label>
        <p>{example}</p>
      </div>
      <ActionBox>
        <EditIcon
          onClick={() => {
            navigate(`/update/${id}`, { state: post });
          }}
        />
        <DeleteIcon
          onClick={() => {
            alert("삭제하시겠습니까?");
            dispatch(deleteDictionaryFB(id));
          }}
        />
      </ActionBox>
    </Post>
  );
};

export default Card;

const Post = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 8px;
  background-color: #f2cb05;
  border: 1px solid #d97904;
  label {
    font-size: 12px;
    text-decoration: underline;
  }
  p {
    margin: 0;
    margin-bottom: 8px;
  }
  p:last-child {
    color: #0487d9;
  }
`;

const ActionBox = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  svg {
    color: #d97904;
    &:hover {
      color: #04b2d9;
      opacity: 0.8;
    }
  }
`;
