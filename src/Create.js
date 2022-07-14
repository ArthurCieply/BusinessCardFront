import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator  } from '@aws-amplify/ui-react';
//import Auth from '@aws-amplify/auth';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

//Local Storage "token"
//const token = JSON.parse(localStorage.getItem("token"));
/*const token = (localStorage);
console.log(token);*/

const Create = () => {

    //console.log(Auth.currentSession());
    /*const id_token = Auth.currentSession().then(data => data.idToken.jwtToken);
    console.log("ID Token: ", id_token);
    const currentuser = Auth.currentAuthenticatedUser();
    console.log("Current User: ", currentuser);*/

    //const access_token = Auth.currentSession().then(data => data.accessToken.jwtToken);
    //console.log("Access Token: ", access_token);
    //Auth.currentSession().then(data => data.idToken.jwtToken);
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
    //Access Token (with Scopes)
    /*Auth.currentSession().then(data => console.log(data.accessToken.jwtToken));
    //ID Token (w/out Scopes)*/
    
    
    //ID TOKEN
    //Auth.currentSession().then(data => console.log(data.idToken.jwtToken));
    /*const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
    console.log(id_token);*/

    /*const currentSession = Auth.currentSession();
    const providerId = currentSession.getIdToken().payload.sub;
    const identityJwt = currentSession.getIdToken().getJwtToken();*/

    /*Auth.currentSession().then(res=>{
        let accessToken = res.getAccessToken()
        let jwt = accessToken.getJwtToken()
        //You can print them to see the full objects
        console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
        console.log(`myJwt: ${jwt}`)
    });*/


    // Current
    /*Auth.currentSession().then(res=>{
        let idToken = res.getIdToken()
        let jwt = idToken.getJwtToken()
        //You can print them to see the full objects
        console.log(`myIDToken: ${JSON.stringify(idToken)}`)
        console.log(`myJwt: ${jwt}`)
    });*/
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const card = { cardName, age, dob, jobTitle, employer, cityState, email, phoneNumber, profilePicture };

        setIsPending(true);

        const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
        console.log(id_token);

        fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + id_token
                
                /*"Authorization": 'Bearer eyJraWQiOiJ6OGdmR01sa2tKWnF4Qmk5a05TU3F5VUx5eFQ1RG1tQ1RqNko0dndKRWE0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiM2YxMmRhYi05MTUyLTQxNTUtYTY4Mi0xZWNlN2U2ZjZiYWYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfeUhKaHkyRmtkIiwiY29nbml0bzp1c2VybmFtZSI6ImIzZjEyZGFiLTkxNTItNDE1NS1hNjgyLTFlY2U3ZTZmNmJhZiIsIm9yaWdpbl9qdGkiOiI3OGUyM2UwMy04ODI2LTRiNWEtYmQyMS1mNTMyZWYzMWIyMTUiLCJhdWQiOiI3aHN0MjM0bDY1M2xrcGhrMGVpMHNhdXB1YyIsImV2ZW50X2lkIjoiNjlmY2U2NWYtYjRmZi00Nzc1LTgzZjItYWE1YzI0N2NlYWI4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTczMTUxOTAsImV4cCI6MTY1NzMyNTgzMCwiaWF0IjoxNjU3MzIyMjMwLCJqdGkiOiJjYzFiODY3Mi0wNjIwLTQ5ZjgtYjE2Mi1lM2M4NDk2OWJiYzMiLCJlbWFpbCI6ImFydGh1ci5jaWVwbHlAZ21haWwuY29tIn0.dtNWUbKfBA9rdqsVHXKaYVcJGoXaYVMykNchte_VOlpOeea2LtsVqxmQx0AAgTgxYbHE-tbvo_4-4QcRUljNQ3CPZidYs2GO0LKw12J-N9rAah8CJbzToKms22_urGEQMhZ4w0r8oa1yN_RiJTiYEqck9WjvIDOfK0obDtqG1o_UnV3tiROnCWzBbe5GVWLwe-DH_InR9ER3NFXeVJb32SzbPOyB2Q8diTp1yyG74E_8xDTn6FBaDvteEs-le5Ik5dfUetsP_7_BF4znzNUrHFukr_DzVXfBM2jpHoo-wzgNFXohHz5CtjASUuudyokk3h-td3KBtTUjbMQxMDzsOg'*/   

                //"Authorization": `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                //"Authorization": 'Bearer ' + Auth.currentSession().then(data => data.accessToken.jwtToken)
                //"Authorization": 'Bearer ' + Auth.currentSession().then(data => data.idToken.jwtToken) 
            },
            body: JSON.stringify(card)
        }).then(() => {
            console.log('New card added');
            setIsPending(false);
            //history.go(-1);
            history.push('/');
        }).catch(err => console.error(err))
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