import { useEffect, useState } from "react";
import axios from "axios";
import PatientInput from "./Components/PatientInput/PatientInput";
import PatientResults from "./Components/PatientInput/PatientResults/PatientResults";
import Loader from "./Components/Loader/Loader";
import PatientDetails from "./Components/PatientDetails/PatientDetails";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [patientResults, setPatientResults] = useState([]);
  const [selectedPatientGeneralData, setSelectedPatientGeneralData] = useState(
    {}
  );
  const [selectedPatientMRN, setSelectedPatientMRN] = useState("");
  const [conditionArray, setConditionArray] = useState([]);
  const [loader, setLoader] = useState(false);

  const onHandleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const initiateSearch = (e) => {
    console.log("initiate serach goingo n");
    setSearchOn(true);
  };

  const onHandleClearButton = () => {
    console.log("OHCB running");
    setInputValue("");
    setSelectedPatientGeneralData({});
    setSelectedPatientMRN('');
    setConditionArray([]);
    setPatientResults([]);
  };

  const handlePatientSelection = (generalData, MRN) => {
    console.log("handlePatientSelection running", MRN);
    setSelectedPatientGeneralData(generalData);
    setSelectedPatientMRN(MRN);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.logicahealth.org/elsytest/open/Patient?name:contains=${inputValue}&_sort:asc=family`
      );
      console.log("look at the axios response!", response);
      setLoader(false);
      setPatientResults(response?.data?.entry || []);
    }
    if (inputValue !== "" && searchOn) {
      setLoader(true);
      setSearchOn(false);
      fetchData();
    }
  }, [inputValue, searchOn]);

  useEffect(() => {
    async function fetchConditionData() {
      const response = await axios.get(
        `https://api.logicahealth.org/elsytest/open/Condition?subject=Patient%2F${selectedPatientMRN}`
      );
      console.log("look at the condition response", response);
      await createConditionArray(response.data.entry);
    }
    async function createConditionArray(conditionData) {
      console.log("whoohoo", conditionData);
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

  return (
    <div className="App">
      <PatientInput
        initiateSearch={initiateSearch}
        onHandleInputChange={onHandleInputChange}
        onHandleClearButton={onHandleClearButton}
      />
      {loader ? <Loader /> : null}
      {!loader && patientResults.length > 0 && selectedPatientMRN === '' ? (
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
    </div>
  );
}

export default App;
