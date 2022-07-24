import { React, useState, useEffect } from "react";
import useFetch from './useFetch';
import { Amplify, Auth, Storage } from 'aws-amplify';
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import { v4 as uuidv4 } from "uuid";
import awsExports from './aws-exports';
Amplify.configure(awsExports);


const Table = () => {

    //  Fetch Cards -   Works
    /*const { data: cards, isPending, error } = useFetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards', {
        method: 'GET',    
        headers: {
            "Content-Type": "application/json"
        }
    });*/

    /*const { data } = fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards', {
        method: 'GET',    
        headers: {
            "Content-Type": "application/json"
        }
    });

    const [cards, setCards] = useState(data);*/
    
    const [ cards, setCards ] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards', {
            method: 'GET',    
            headers: {
                "Content-Type": "application/json"
            }
        });
        const jsonResult = await result.json();

        const sub = await Auth.currentAuthenticatedUser().then((user) => (user.attributes.sub));
        console.log(sub);

        setCards(jsonResult);
    };


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

    const handlePicture = (event) => {
        event.preventDefault();

        setPictureStatus(true);

        //const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.files[0];

        //const newPicture = { ...picture};
        //newPicture[fieldName] = fieldValue;

        setPicture(fieldValue);
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

        if (!pictureStatus) { // No Picture
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
            }).catch(err => console.error(err))
    
            let newCards = [...cards, newCard];
            setCards(newCards);
            event.target.reset();   
        }

        //------- Processing Image Upload ----------

        else if (pictureStatus) { //& !pictureName) {

            // Get sub to append to picture name
            const sub = await Auth.currentAuthenticatedUser().then((user) => (user.attributes.sub));

            //Rename Image + Upload Image
            
            console.log("Start Image Upload")
            //const sort = uuidv4()
            try {
                const result = await Storage.put(`${sub}---${sort}.png`, picture, {
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
                }).catch(err => console.error(err))
        
                let newCards = [...cards, newCard];
                setCards(newCards);
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
        <div className="table">
            <h2>Table:</h2>
            { !cards && <div>Loading...</div> }
            {cards && 
                <table>
                    <thead>
                        <tr>
                            <th>Card Creator (PK)</th>
                            <th>Card Sort (SK)</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Date of Birth</th>
                            <th>Job Title</th>
                            <th>Employer</th>
                            <th>City, State</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Profile Picture Name</th>
                            <th>Profile Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map((card)=> (
                            <tr key={card.id + card.sort}>
                                <td>{ card.id }</td>
                                <td>{ card.sort }</td>
                                <td>{ card.cardName }</td>
                                <td>{ card.age }</td>
                                <td>{ card.dob }</td>
                                <td>{ card.jobTitle }</td>
                                <td>{ card.employer }</td>
                                <td>{ card.cityState }</td>
                                <td>{ card.email }</td>
                                <td>{ card.phoneNumber }</td>
                                <td>{ card.pictureName }</td>
                                <td className="table-image"><AmplifyS3Image imgKey={ card.pictureName }/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <h2>Add Card</h2>
            {/*<form onSubmit={handleAddFormSubmit}>*/}
            <div className="add-form">
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
                        max={125}
                        onChange={handleAddFormChange}
                        //value={age}
                        placeholder="Enter age..."
                        //onChange={(e) => setAge(e.target.value)}
                    />
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
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
        </div>
    )
}

export default Table;