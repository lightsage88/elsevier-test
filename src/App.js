import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import PatientInput from "./Components/PatientInput/PatientInput";
import PatientResults from "./Components/PatientResults/PatientResults";
import Loader from "./Components/Loader/Loader";
import PatientDetails from "./Components/PatientDetails/PatientDetails";
import MessageToast from "./Components/MessageToast/MessageToast";
import "../node_modules/antd/dist/antd.css";
import "./App.css";
//#region StyledComponents
const StyledAppDiv = styled.div`
  padding: 2rem;
`;
//#endregion
/**
 * This method renders the App
 * @returns {JSX} 
 */
function App() {
  //#region UseState Items
  const [inputValue, setInputValue] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [patientResults, setPatientResults] = useState([]);
  const [selectedPatientGeneralData, setSelectedPatientGeneralData] = useState(
    {}
  );
  const [selectedPatientMRN, setSelectedPatientMRN] = useState("");
  const [conditionArray, setConditionArray] = useState([]);
  const [loader, setLoader] = useState(false);
  const [messageToastData, setMessageToastData] = useState({
    message: "",
    alertType: "",
  });
  const [showMessage, setShowMessage] = useState(false);
  //#endregion
  //#region Methods
  /**
   * This method handles the change of the input so as to update the inputValue state-item
   * @param {EventObject} e  
   */
  const onHandleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  /**
   * This method initiates the search feature by setting the searchOn state-item to true
   * @param {EventObject} e 
   */
  const initiateSearch = (e) => {
    console.log("initiate serach goingo n");
    setSearchOn(true);
  };
  /**
   * This method handles the functionality associated with clicking the 'Reset' button in the PatientInput component.
   * It is passed as a prop to 'PatientInput'.
   */
  const onHandleClearButton = () => {
    console.log("OHCB running");
    setInputValue("");
    setSelectedPatientGeneralData({});
    setSelectedPatientMRN("");
    setConditionArray([]);
    setPatientResults([]);
  };
  /**
   * This method sets values for several patient related state-items to allow the app to display details about the patient including
   * demographic and conditional information.
   * @param {Object} generalData - an object of data about the selected patient
   * @param {String} MRN - a string of the medical record number for the selected patient
   */
  const handlePatientSelection = (generalData, MRN) => {
    setSelectedPatientGeneralData(generalData);
    setSelectedPatientMRN(MRN);
  };
  //#endregion
  //#region UseEffects
  /**
   * This useEffect determines whether or not a search for a patient will be conducted and sets the returned data into state-items if successful.
   * If unsuccessful, state-items related to the toast are updated to have failure indicating values.
   */
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.logicahealth.org/elsytest/open/Patient?name:contains=${inputValue}&_sort:asc=family`
      );
      setLoader(false);
      if (!response?.data?.entry) {
        setShowMessage(true);
        setMessageToastData({
          message: `No results found!`,
          alertType: "error",
        });
      }
      setPatientResults(response?.data?.entry || []);
    }
    if (inputValue !== "" && searchOn) {
      setLoader(true);
      setSearchOn(false);
      fetchData();
    }
  }, [inputValue, searchOn]);
  /**
   * This useEffect updates the messageToast related state-items following a successful search and 
   * resets the state-items whether successful or not after a few seconds.
   */
  useEffect(() => {
    if (patientResults.length > 0) {
      setShowMessage(true);
      setMessageToastData({
        message: `${patientResults.length} result(s) found!`,
        alertType: "success",
      });
    }
    setTimeout(() => {
      setShowMessage(false);
      setMessageToastData({ message: "", alertType: "" });
    }, 2000);
  }, [patientResults]);
  /**
   * This useEffect fetches data pertaining to a patients' conditions if their MRN is successfully retrieved and stored in state.
   * The resulting data is then set into the 'conditionArray' state-item.
   */
  useEffect(() => {
    async function fetchConditionData() {
      const response = await axios.get(
        `https://api.logicahealth.org/elsytest/open/Condition?subject=Patient%2F${selectedPatientMRN}`
      );
      await createConditionArray(response.data.entry);
    }
    async function createConditionArray(conditionData) {
      const result = conditionData.map((el) => {
        return {
          onsetDateTime: el.resource.onsetDateTime,
          name: el.resource.code.text,
        };
      });
      setConditionArray(result);
    }
    if (selectedPatientMRN !== "") {
      setConditionArray([]);
      fetchConditionData();
    }
  }, [selectedPatientMRN]);
  //#endregion
  //#region JSX
  return (
    <StyledAppDiv className="App">
      {messageToastData.message !== "" && showMessage === true && (
        <MessageToast
          messageToastData={messageToastData}
          showMessage={showMessage}
        />
      )}
      <PatientInput
        initiateSearch={initiateSearch}
        onHandleInputChange={onHandleInputChange}
        onHandleClearButton={onHandleClearButton}
      >
        {loader ? <Loader /> : null}
      </PatientInput>
      {!loader && patientResults.length > 0 && selectedPatientMRN === "" ? (
        <PatientResults
          patientResults={patientResults}
          handlePatientSelection={handlePatientSelection}
        />
      ) : null}
      {patientResults.length > 0 && conditionArray.length > 0 ? (
        <PatientDetails
          patientData={selectedPatientGeneralData}
          conditionList={conditionArray}
        />
      ) : null}
    </StyledAppDiv>
  );
  //#endregion
}

export default App;
