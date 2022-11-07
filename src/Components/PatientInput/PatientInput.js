const PatientInput = (props) => {
  const handleButtonClick = () => {
    props.onHandleClearButton();
    const patientInput = document.getElementById("patient-input");
    patientInput.value = "";
  };
  return (
    <>
      <input
        id="patient-input"
        type="text"
        onChange={(e) => props.onHandleInputChange(e)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            props.initiateSearch(e);
          }
        }}
      ></input>
      <button onClick={(e) => props.initiateSearch(e)}>SEARCH</button>
      <button
        onClick={() => {
          handleButtonClick();
        }}
      >
        Clear
      </button>
    </>
  );
};

export default PatientInput;
