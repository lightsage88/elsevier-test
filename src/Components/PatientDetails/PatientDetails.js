import styled from "styled-components";
//#region StyledComponents
const StyledListItem = styled.li`
  transition: all 1s;
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  border: solid 3px blue;
  background: beige;
  padding: 1rem;
  &:hover {
    cursor: pointer;
    border-color: red;
    background: ghostwhite;
    transform: scale(1.1);
    a {
      color: red;
    }
  }
`;
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
  /**
   * This use of 'map' on the 'conditionList' variable returns one or more list-items that will be used to populate a list element further
   * down in the component.
   */
  const conditions = conditionList.map((el, key) => {
    return (
      <StyledListItem>
        <strong>
          Condition Name:{" "}
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/?term=${el.name}`}
            target="_"
          >
            {el.name}
          </a>
        </strong>
        <span>
          <strong>First Noticed: </strong>{" "}
          {new Date(el.onsetDateTime).toLocaleDateString("en-US")}
        </span>
      </StyledListItem>
    );
  });
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
        <ul>{conditions}</ul>
      </div>
    </div>
  );
  //#endregion
};

export default PatientDetails;
