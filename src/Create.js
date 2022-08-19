//import { React, useState, useEffect } from "react";
//import useFetch from './useFetch';
import { React, useState } from "react";
import { Amplify, Auth, Storage } from 'aws-amplify';
//import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Resizer from "react-image-file-resizer";
import awsExports from './aws-exports';
Amplify.configure(awsExports);



const Create = () => {

    const [ addFormData, setAddFormData ] = useState({
        sort: '',
        cardName: '',
        age: '',
        dob: '',
        jobTitle: '',
        employer: '',
        cityState: '',
        email: '',
        phoneNumber: '',
        pictureName: '',
    })

    const [ picture, setPicture ] = useState()
    const [pictureStatus, setPictureStatus] = useState(false);

    const history = useHistory();

    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
        uri => {
          resolve(uri);
        }, 'file' );
    });

    const handlePicture = async (event) => {
        event.preventDefault();

        setPictureStatus(true);

        //const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.files[0];//event.target.value;
        const image = await resizeFile(fieldValue);

        //const newPicture = { ...picture};
        //newPicture[fieldName] = fieldValue;

        //setPicture(newPicture);
        setPicture(image);
    }

    console.log("Outside: ", picture)
    
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        const sort = uuidv4()
        console.log('pictureStatus:', pictureStatus);
        console.log("picture: ", picture)

        if (!pictureStatus) { // No Picture
            console.log("pictureStatus false branch");

            let newCard = {
                sort: sort,
                cardName: addFormData.cardName,
                age: addFormData.age,
                dob: addFormData.dob,
                jobTitle: addFormData.jobTitle,
                employer: addFormData.employer,
                cityState: addFormData.cityState,
                email: addFormData.email,
                phoneNumber: addFormData.phoneNumber,
                pictureName: addFormData.pictureName,
            };
    
            const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
            console.log(id_token);
    
            fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards', {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + id_token 
                },
                body: JSON.stringify(newCard)
            }).then(() => {
                console.log('New card added');
                history.push('/BusinessCardFront/');
            }).catch(err => console.error(err))
    
            //let newCards = [...cards, newCard];
            //setCards(newCards);
            event.target.reset();   
        }

        //------- Processing Image Upload ----------

        else if (pictureStatus) { //& !pictureName) {
            console.log("pictureStatus true branch");

            // Get sub to append to picture name
            const sub = await Auth.currentAuthenticatedUser().then((user) => (user.attributes.sub));

            //Rename Image + Upload Image
            
            console.log("Start Image Upload")
            //const sort = uuidv4()
            let creds = await Auth.currentUserCredentials()
            console.log(creds.identityId)
            try {
                console.log("picture: ", picture);
                //const result = await Storage.put(`${sub}/${sort}.png`, picture, {
                const result = await Storage.put(`${creds.identityId}/${sub}---${sort}.png`, picture, {
                    contentType: "image/png",
                    progressCallback(progress) {
                        console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
                    }
                });
                //setPictureStatus(true);
                console.log(result);
                console.log(result.key);
                //setPictureName(result.key);
                
                //  Assign Picture's new name to pictureName (setState ect...)
                //const newFormData = { ...addFormData};
                //newFormData[addFormData.pictureName] = result.key;
        
                //setAddFormData(newFormData);

                //  Continue
                let newCard = {
                    sort: sort,
                    cardName: addFormData.cardName,
                    age: addFormData.age,
                    dob: addFormData.dob,
                    jobTitle: addFormData.jobTitle,
                    employer: addFormData.employer,
                    cityState: addFormData.cityState,
                    email: addFormData.email,
                    phoneNumber: addFormData.phoneNumber,
                    //pictureName: addFormData.pictureName, // ???Replace with newly created setPictureName(result.key)
                    pictureName: result.key,
                };
        
                const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
                console.log(id_token);
        
                fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards', {
                    method: 'POST',
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + id_token 
                    },
                    body: JSON.stringify(newCard)
                }).then(() => {
                    console.log('New card added');
                    history.push('/BusinessCardFront/');
                }).catch(err => console.error(err))
        
                //let newCards = [...cards, newCard];
                //setCards(newCards);
                event.target.reset();
            } catch (error) {
                console.log("Image upload error:");
                console.log(error);
            }
            //let newCards = [...cards, newCard];
            //setCards(newCards);
            event.target.reset();
        }
    };

    return ( 
        <div className="create">
            <h2>Add a New Card</h2>

            <form onSubmit={handleAddFormSubmit}>
                <label>Name:</label>
                <input 
                    type="text"
                    name="cardName"
                    required
                    placeholder="Enter name..."
                    onChange={handleAddFormChange}
                />
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    min={17}
                    max={99}
                    onChange={handleAddFormChange}
                    //value={age}
                    placeholder="Enter age..."
                    //onChange={(e) => setAge(e.target.value)}
                />
                <label>Date of Birth:</label>
                <input
                    type="date"
                    name="dob"
                    min={"1923-01-01"}
                    max={"2006-01-01"}
                    placeholder="Date of birth..."
                    onChange={handleAddFormChange}
                    //value={dob}
                    //onChange={(e) => setDob(e.target.value)}
                />
                <label>Job Title:</label>
                <input
                    type="text"
                    name="jobTitle"
                    required
                    placeholder="Enter job title..."
                    onChange={handleAddFormChange}
                    //value={jobTitle}
                    //onChange={(e) =>setJobTitle(e.target.value)}
                />
                <label>Employer:</label>
                <input
                    type="text"
                    name="employer"
                    required
                    placeholder="Enter employer..."
                    onChange={handleAddFormChange}
                    //value={employer}
                    //onChange={(e) => setEmployer(e.target.value)}

                />
                <label>City, State:</label>
                <input
                    type="text"
                    name="cityState"
                    placeholder="Enter city and state..."
                    onChange={handleAddFormChange}
                    //value={cityState}
                    //onChange={(e) => setCityState(e.target.value)}
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email..."
                    onChange={handleAddFormChange}
                    //value={email}
                    //onChange={(e) => setEmail(e.target.value)}
                />
                <label>Phone Number:</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter phone number..."
                    onChange={handleAddFormChange}
                    //value={phoneNumber}
                    //onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    style={{display: 'none'}}
                    type="text"
                    name="pictureName"
                    onChange={handleAddFormChange}
                    //value={pictureName}
                    /*onChange={(e) => setPhoneNumber(e.target.value)}*/
                />
                <label>Profile Picture:</label>
                <input
                    type="file"
                    name="picture"
                    placeholder="Select Image"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handlePicture}
                    //onChange={(e) => setPicture(e.target.files[0])}
                />
                <button type="submit">Add</button>
            </form>

        </div>  

    )

}

export default Create;


/*import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Amplify, Auth, Storage } from 'aws-amplify';
import { Authenticator  } from '@aws-amplify/ui-react';
//import Auth from '@aws-amplify/auth';
import awsExports from './aws-exports';
import React from 'react';
import { v4 as uuidv4 } from "uuid";
Amplify.configure(awsExports);

//Local Storage "token"
//const token = JSON.parse(localStorage.getItem("token"));
//const token = (localStorage);
//console.log(token);

const Create = () => {

    //console.log(Auth.currentSession());
    //const id_token = Auth.currentSession().then(data => data.idToken.jwtToken);
    //console.log("ID Token: ", id_token);
    //const currentuser = Auth.currentAuthenticatedUser();
    //console.log("Current User: ", currentuser);

    //const access_token = Auth.currentSession().then(data => data.accessToken.jwtToken);
    //console.log("Access Token: ", access_token);
    //Auth.currentSession().then(data => data.idToken.jwtToken);
    //console.log("ID Token: ", id_token);

    //Auth.currentSession()
      //.then(data => console.log(data.idToken.jwtToken))
      //.catch(err => console.log(err));

    const [cardName, setCardName] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [employer, setEmployer] = useState('');
    const [cityState, setCityState] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    //const [profilePicture, setProfilePicture] = useState('');
    const [pictureName, setPictureName] = useState('');

    const [picture, setPicture] = useState();
    const [pictureStatus, setPictureStatus] = useState(false);

    const [isPending, setIsPending] = useState(false);

    const history = useHistory();
    
    const sub = uuidv4();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const card = { sub, cardName, age, dob, jobTitle, employer, cityState, email, phoneNumber, pictureName };

        setIsPending(true);

        const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
        console.log(id_token);

        fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + id_token 
            },
            body: JSON.stringify(card)
        }).then(() => {
            console.log('New card added');
            setIsPending(false);
            //history.go(-1);
            history.push('/');
        }).catch(err => console.error(err))
    }

    //  Works
    const uploadPicture = async (pictureName) => {
        console.log("Start Image Upload")
        const sub = await Auth.currentAuthenticatedUser().then((user) => (user.attributes.sub));
        //const imageuuid = uuidv4()
        try {
            const result = await Storage.put(`${sub}---${sub}.png`, picture, {
                contentType: "image/png",
                progressCallback(progress) {
					console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
				}
            });
            setPictureStatus(true);
            console.log(result);
            console.log(result.key);
            setPictureName(result.key);
        } catch (error) {
            console.log(error)
        }
    };

    console.log("Outside: ", pictureName)


    return ( 
        <div className="create">
            <h2>Add a New Card</h2>  
            <div>
                <input 
                    type="file"
                    placeholder="Select Image"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => setPicture(e.target.files[0])}
                />
            </div>
            <div>
                <button onClick={uploadPicture}>Upload Image</button>
            </div>
            {pictureStatus ? 'Image Uploaded Successfully' : ""}

            <form onSubmit={handleSubmit}>
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
                    max={99}
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
                <label style={{display: 'none'}}>Picture</label>
                <input
                    style={{display: 'none'}}
                    type="text"
                    value={pictureName}
                    //onChange={(e) => setPhoneNumber(e.target.value)}
                />
                { !isPending && <button>Add Card</button> }
                { isPending && <button disabled>Adding Card...</button> }
            </form>
        </div>
     );
}
 
export default Create;*/
