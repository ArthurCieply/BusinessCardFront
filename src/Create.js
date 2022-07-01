import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    //  Temporary partition key
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
        const card = { cardName, age, dob, jobTitle, employer, cityState, email, phoneNumber, profilePicture };

        setIsPending(true);

        fetch('https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards', {
            method: 'POST',
            headers: { 
                "Authorization": 'eyJraWQiOiJtcmNpS3lHZ3g1bDNlbHQwdnBXOVp3QXFUNE9tR0lUMkFzb1I0UTBJaWJJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzZjU4NzNjYy1lNTc5LTQyYzgtOWE1MC1jYWMyNmI0ZjRlMjEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9CZXZzbkw5U2ciLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI1ZWc1Y2I4cTIwZW9wbmFjNGszZDRpcGs1aiIsImV2ZW50X2lkIjoiZmFkNjEzZTEtYjVmMC00MWRjLWEzMzgtOGM2ZWI3ZjUwZmQ3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY1NjYxNTcyNiwiZXhwIjoxNjU2NjE5MzI2LCJpYXQiOjE2NTY2MTU3MjYsImp0aSI6Ijk0Y2I1MWUzLTZhYTgtNDA3YS05N2NhLWE5ZWEyMjM2NTM2OCIsInVzZXJuYW1lIjoiYXJ0aHVyY2llcGx5MSJ9.a94eaARebwI4xfkxOKtQrsVkq2bAVYQuoMq0Q4nIXbQphyfpepxLc-w3yPrVEQzY1fCqlKklxZgHM5rAVVM0-RVEx1gakucBuRGYU8psz4Snj5rSGtJI7Trfxjf1zkjD6dq9qJxHVtfDRQ-7uyPZinqjDt7Xo-zA5lkdh4688lIxA4QylNBR8ivhLrQ4USEwE4FB6d-ga5xdkbweYEUE4LPM8yw1UV5iqrxeHOHWCEpV8nsNgM4cR9AKi8yLBg9VPxDkZY1K70a0LXpIXwe9zQyKN17XQMyQBF0YqyiKDP0KvA_bN5Xa4rxLQAXyOUd0qG-zfefEL8lT8zv52GlNGQ',
                "Content-Type": "application/json"
            },
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
            {/*<label>TEMPORARY Id:</label> 
                <input
                    type="number"
                    required
                    value=
                    onChange= //parseInt turns that value (string) into an Int
                />*/}
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