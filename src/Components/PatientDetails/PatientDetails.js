import styled from "styled-components";
import SortableConditionTable from "../SortableConditionTable/SortableConditionTable";
//#region StyledComponents
const StyledBasicPatientDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 3px black;
  padding: 1rem;
  width: fit-content;
`;
//#endregion
/**
 * This method returns the PatientDetails component.
 * @param {Object} props
 * @returns {JSX}
 */
const PatientDetails = (props) => {
  //#region Variables
  const { firstName, middleInitial, lastName, DOB, gender } = props.patientData;
  const { conditionList } = props;
  //#endregion
  //#region JSX
  return (
    <div>
      <h2>Patient Details:</h2>
      <StyledBasicPatientDetailsDiv id="basic-patient-details">
        <strong>
          Name: {firstName} {middleInitial} {lastName}
        </strong>
        <strong>DOB: {DOB}</strong>
        <strong>Gender: {gender}</strong>
      </StyledBasicPatientDetailsDiv>
      <div id="patient-condition-list">
        <h2>Conditions:</h2>
        <SortableConditionTable conditionList={conditionList}/>
      </div>
    </div>
  );
  //#endregion
};

export default PatientDetails;
