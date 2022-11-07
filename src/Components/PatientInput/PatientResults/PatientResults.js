
const PatientResults = (props) => {
    const patients = props.patientResults.map((el, index) => {
        const firstName = el.resource.name[0].given[0];
        const middleInitial = el.resource.name[0].given[1] + '.' || '';
        const lastName = el.resource.name[0].family;
        const gender = el.resource.gender;
        const DOB = el.resource.birthDate;
        //Possibly see if there are multiple kinds of identifiers that might collide
        const MRN = el.resource.identifier[0].value;
        const generalData = {
            firstName,
            middleInitial,
            lastName,
            gender,
            DOB
        }
        return (
            <li key={index} onClick={(e) => {props.handlePatientSelection(generalData, MRN)}}>
                <h4>Name: {firstName} {middleInitial} {lastName}</h4>
                <h5>{gender}</h5>
                <strong>{DOB}</strong>
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