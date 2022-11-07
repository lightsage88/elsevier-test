import styled from "styled-components";
//#region StyledComponents
const StyledPatientInputDiv = styled.div`
  border: solid 3px black;
  width: 100%;
  padding: 2rem;
`;
const StyledPatientInput = styled.input`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  width: inherit;
`;
const StyledPatientInputButton = styled.button`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
//#endregion
/**
 * This method returns the PatientInput component.
 * @param {Object} props
 * @returns {JSX}
 */
const PatientInput = (props) => {
  //#region Methods
  const handleButtonClick = () => {
    props.onHandleClearButton();
    const patientInput = document.getElementById("patient-input");
    patientInput.value = "";
  };
  //#endregion
  //#region JSX
  return (
    <StyledPatientInputDiv>
      <StyledPatientInput
        id="patient-input"
        type="text"
        onChange={(e) => props.onHandleInputChange(e)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            props.initiateSearch(e);
          }
        }}
        placeholder="Enter name, click 'Search' or press 'Enter'"
      ></StyledPatientInput>
      <StyledPatientInputButton onClick={(e) => props.initiateSearch(e)}>
        Search
      </StyledPatientInputButton>
      <StyledPatientInputButton
        onClick={() => {
          handleButtonClick();
        }}
      >
        Reset
      </StyledPatientInputButton>
      {props.children}
    </StyledPatientInputDiv>
  );
  //#endregion
};

export default PatientInput;
