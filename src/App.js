import { useEffect, useState } from "react";
import axios from "axios";
import PatientInput from "./Components/PatientInput/PatientInput";
import PatientResults from "./Components/PatientInput/PatientResults/PatientResults";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [patientResults, setPatientResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});

  const onHandleInputChange = (e) => {
      setInputValue(e.target.value);
  };

  const initiateSearch = (e) => {
    console.log('initiate serach goingo n');
    setSearchOn(true);
  }

  const onHandleClearButton = () => {
    console.log("OHCB running");
    setInputValue("");
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.logicahealth.org/elsytest/open/Patient?name:contains=${inputValue}&_sort:asc=family`
      );
      console.log("look at the axios response!", response);
      setPatientResults(response.data.entry);
    }
    if (inputValue !== '' && searchOn) {
      setSearchOn(false);
      fetchData();
    }
  }, [inputValue, searchOn]);

  return (
    <div className="App">
      <PatientInput
        initiateSearch={initiateSearch}
        onHandleInputChange={onHandleInputChange}
        onHandleClearButton={onHandleClearButton}
      />
      <PatientResults patientResults={patientResults} />
    </div>
  );
}

export default App;
