import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator  } from '@aws-amplify/ui-react';
//import Auth from '@aws-amplify/auth';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const Create = () => {

    //console.log(Auth.currentSession());
    /*const id_token = Auth.currentSession().then(data => data.idToken.jwtToken);
    console.log("ID Token: ", id_token);
    const currentuser = Auth.currentAuthenticatedUser();
    console.log("Current User: ", currentuser);*/

    //Auth.currentSession().then(data => console.log(data.idToken.jwtToken));
    //const access_token = Auth.currentSession().then(data => data.accessToken.jwtToken);
    //console.log("Access Token: ", access_token);
    //const id_token = Auth.currentSession().then(data => data.idToken.jwtToken);
    //console.log("ID Token: ", id_token);

    /*Auth.currentSession()
      .then(data => console.log(data.idToken.jwtToken))
      .catch(err => console.log(err));*/

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

    

    //Makes the whole page disappear!!!
    //  https://stackoverflow.com/questions/48777321/aws-amplify-authentication-how-to-access-tokens-on-successful-auth-signin
    /*Auth.currentSession().then(res=>{
        let accessToken = res.getAccessToken()
        let jwt = accessToken.getJwtToken()
        //You can print them to see the full objects
        console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
        console.log(`myJwt: ${jwt}`)
        console.log(jwt)
        //console.log(Auth.currentSession().then(res=>{res.getAccessToken().getJwtToken()}))
    })*/

    //console.log(Auth.currentSession().getIdToken().getJwtToken());
    
    //Returns Valid Signature in JWT.io
    Auth.currentSession().then(data => console.log(data.accessToken.jwtToken));
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const card = { cardName, age, dob, jobTitle, employer, cityState, email, phoneNumber, profilePicture };

        setIsPending(true);

        fetch('https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards', {
            //method: 'POST',
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                //'Access-Control-Allow-Origin':'*',
                //'Access-Control-Allow-Methods':'POST,GET,OPTIONS',
                // Access Token hard coded doesn't work, nor does it work in Postman
                
                
                //"Authorization": 'eyJraWQiOiJ6N2VwVzhyTVJcL09TRzJSK0dCakJYRXpsYldHRVFwM1g3T0NTb1wvS1RwKzQ9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiM2YxMmRhYi05MTUyLTQxNTUtYTY4Mi0xZWNlN2U2ZjZiYWYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV95SEpoeTJGa2QiLCJjbGllbnRfaWQiOiI3aHN0MjM0bDY1M2xrcGhrMGVpMHNhdXB1YyIsIm9yaWdpbl9qdGkiOiI2OWY2NjdiMC0xMTM2LTRlNDQtOTY4NC1kYTRhNDgwMTFiMGIiLCJldmVudF9pZCI6IjY5YWQyMTA4LWE5OGUtNDc0Mi05NDYzLTBhNzYzNDU4YjE4NCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTcyMzU1ODIsImV4cCI6MTY1NzI0Mjg3OSwiaWF0IjoxNjU3MjM5Mjc5LCJqdGkiOiJjZDZmYjgwNi0wMjk3LTQzN2EtYmRiYi1mOTI1MDM4NTI3NzMiLCJ1c2VybmFtZSI6ImIzZjEyZGFiLTkxNTItNDE1NS1hNjgyLTFlY2U3ZTZmNmJhZiJ9.jKfCCk8ZPWzyzx6_USrr_i3MdLGkWlhp6Rg4imgmk2NJea8gDWjkSzzxfK0C_pXV0PQ3mzIdZ_5oyD__Nxak-ps3RIQ-EMM2fzZ_uW2ME4fszCaBuQbn1wjOSlI8JAvyrPVlSuRwPNbwoDvaK5yjzONEAaUUtyMMLbLNJP9qZiU22s_n_ptyXG36zWeNIq_aVkh5Wwe7Px-v-uwE_chj0Nto_pEgUvFxLNom_T9e-OgIX8RsZI5Eh5A_Eq42hT9oX2uS5hHzhEKPNiX7p3CUmPMf88llHh75kfMPdVojPYNMMM2q_GaDXobcDw-KQc9g6bXXbOvhhLCvU2x2zQQ4HA'  
                //"Authorization": `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                //"Authorization": 'Bearer ' + id_token
                "Authorization": Auth.currentSession().then(data => data.accessToken.jwtToken)
                //"Authorization": 'Bearer ' + Auth.currentSession().then(data => data.accessToken.jwtToken)
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
                    //placeholder='John Smith'
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