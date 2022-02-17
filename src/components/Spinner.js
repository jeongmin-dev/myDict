import React from "react";
import styled from "styled-components";
import AbcIcon from '@mui/icons-material/Abc';

const Spinner = (props) => {

    return (
      <Outter>
        <AbcIcon style={{ color: "#F27D16", fontSize: "150px" }} />
      </Outter>
    );
}

const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #BDD9F2;
`;

export default Spinner;