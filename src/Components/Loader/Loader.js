import { Spin } from "antd";
import styled from "styled-components";
//#region StyledComponents
const StyledLoaderDiv = styled.div`
  display: inline;
  margin-left: 1rem;
`;
//#endregion
//#region JSX
/**
 * This method returns the Loader component.
 * @returns {JSX}
 */
const Loader = () => {
  return (
    <StyledLoaderDiv>
      <Spin />
    </StyledLoaderDiv>
  );
};
//#endregion

export default Loader;
