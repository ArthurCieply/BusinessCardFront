import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    //  Temporary partition key
    const [id, setId] = useState('');
    //  ------------------------

    const [cardName, setCardName] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [employer, setEmployer] = useState('');
    const [cityState, setCityState] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const [isPending, setIsPending] = useState(false);

    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const card = { id, cardName, age, dob, jobTitle, employer, cityState, email, phoneNumber, profilePicture };

        setIsPending(true);

        fetch('https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card)
        }).then(() => {
            console.log('New card added');
            setIsPending(false);
            //history.go(-1);
            history.push('/');
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Card</h2>
            <form onSubmit={handleSubmit}>
            <label>TEMPORARY Id:</label> 
                <input
                    type="number"
                    required
                    value={id}
                    onChange={(e) => setId(parseInt(e.target.value))} //parseInt turns that value (string) into an Int
                />
                <label>Name:</label>
                <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                />
                <label>Age:</label>
                <input
                    type="number"
                    min={17}
                    max={125}
                    /*min="17"
                    max="125"*/
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <label>Date of Birth:</label>
                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
                <label>Job Title:</label>
                <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) =>setJobTitle(e.target.value)}
                />
                <label>Employer:</label>
                <input
                    type="text"
                    required
                    value={employer}
                    onChange={(e) => setEmployer(e.target.value)}

                />
                <label>City, State:</label>
                <input
                    type="text"
                    value={cityState}
                    onChange={(e) => setCityState(e.target.value)}
                />
                <label>Email:</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Phone Number:</label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label>***PROFILE PICTURE***:</label>
                <input
                    type="file"
                    value={profilePicture}
                    onChange={(e) => {
                        setProfilePicture(e.target.files[0])}
                        // File Validation (size, extension)
                        
                        // Add code here to upload file to server//
                        //  PROFILE PICTURE LOGIC!!!!
                        
                    }
                />
                { !isPending && <button>Add Card</button> }
                { isPending && <button disabled>Adding Card...</button> }
            </form>
        </div>
     );
}
 
export default Create;