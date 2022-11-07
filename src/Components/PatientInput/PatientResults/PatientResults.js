
const PatientResults = (props) => {
    const patients = props.patientResults.map((el, index) => {
        return (
            <li key={index}>

            </li>
        )
    })
    return (
        <>
            <h3>Patient Results:</h3>
            <ul>
                {patients}
            </ul>
        </>
    )
}

export default PatientResults;