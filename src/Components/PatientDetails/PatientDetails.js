
const PatientDetails = (props) => {
    const { firstName, middleInitial, lastName, DOB, gender } = props.patientData;
    return (
        <div>
            <div id="basic-patient-details">
            <h3>Name: {firstName} {middleInitial} {lastName}</h3>
            <span>DOB: {DOB} | Gender: {gender}</span>
            </div>
            <div id="patient-condition-list">

            </div>
        </div>
    )
}

export default PatientDetails;