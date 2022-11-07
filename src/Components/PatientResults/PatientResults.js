import styled from "styled-components";
//#region StyledComponents
const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  transition: all 1s;
  list-style: none;
  border: solid 2px #007aaf;
  border-radius: 1rem;
  width: fit-content;
  padding: 2rem;
  background: aliceblue;
  &:hover {
    background: lightskyblue;
    transform: scale(1.1);
  }
`;
//#endregion
/**
 * This method returns the PatientResults component.
 * @param {Object} props
 * @returns {JSX}
 */
const PatientResults = (props) => {
  /**
   * This method capitalizes whatever string is passed to it.
   * @param {String} string
   * @returns {String}
   */
  const capitalize = (string) => {
    const letterArray = string.split("");
    const firstLetter = letterArray[0].toUpperCase();
    const remainingLetters = letterArray.slice(1).join("");
    return `${firstLetter}${remainingLetters}`;
  };
  //#region JSX
  /**
   * This use of 'map' on an array generates JSX that will be used to populate an unordered list
   */
  const patients = props.patientResults.map((el, index) => {
    const firstName = el.resource.name[0].given[0];
    const middleInitial = el.resource.name[0].given[1] + "." || "";
    const lastName = el.resource.name[0].family;
    const gender = capitalize(el.resource.gender);
    const DOB = el.resource.birthDate;
    const MRN = el.resource.identifier[0].value;
    const generalData = {
      firstName,
      middleInitial,
      lastName,
      gender,
      DOB,
    };
    return (
      <StyledListItem
        key={index}
        onClick={(e) => {
          props.handlePatientSelection(generalData, MRN);
        }}
      >
        <div>
          <strong>Name:</strong> {firstName} {middleInitial} {lastName}
        </div>
        <div>
          {" "}
          <strong>Gender:</strong> {gender}
        </div>
        <div>
          {" "}
          <strong>DOB:</strong> {DOB}
        </div>
      </StyledListItem>
    );
  });
  return (
    <>
      <h2>Patient Results:</h2>
      <ul>{patients}</ul>
    </>
  );
  //#endregion
};

export default PatientResults;
