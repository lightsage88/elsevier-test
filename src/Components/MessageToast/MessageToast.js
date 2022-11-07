import { Alert } from "antd";
import styled from "styled-components";
//#region StyledComponents
const StyledToastDiv = styled.div`
  transition: all 2s;
  position: absolute;
  top: 0;
  right: 0;
`;
//#endregion
/**
 * This method returns the MessageToast component.
 * @param {Object} props 
 * @returns {JSX}
 */
const MessageToast = (props) => {
  //#region Variables
  const { message, alertType } = props.messageToastData;
  //#endregion
  //#region JSX
  return (
    <StyledToastDiv>
      <Alert message={message} type={alertType} />
    </StyledToastDiv>
  );
  //#endregion
};

export default MessageToast;
