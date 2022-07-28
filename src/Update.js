import { useState, useEffect } from "react";
//import { useHistory, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
//import useFetch from "./useFetch";
//import { Link } from "react-router-dom";
//import { Amplify, Auth, Storage } from 'aws-amplify';
import { Auth, Storage } from 'aws-amplify';
//import { v4 as uuidv4 } from "uuid";

const Update = () => {

    const { id } = useParams();
    const { sort } = useParams();
    //const history = useHistory();
    //const cardIdSort = id + sort;
    const [ card, setCard ] = useState({
        id: '',
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort, {
            method: 'GET',    
            headers: {
                "Content-Type": "application/json"
            }
        });
        const jsonResult = await result.json();

        //const sub = await Auth.currentAuthenticatedUser().then((user) => (user.attributes.sub));
        //console.log(sub);

        await setCard(jsonResult);
        console.log(card);
    };
    

    //-------------------------------------
    //--------------- Edit ----------------
    //-------------------------------------

    const [editFormData, setEditFormData] = useState({
        id: '',
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
    });

    //Rename to editCardIdSort
    //      Not Used      const [editCardId, setEditCardId ] = useState(null);

    //---------------------------------------

    const [ pictureChange, setPictureChange ] = useState();
    const [ pictureChangedStatus, setPictureChangedStatus ] = useState(false);

    //--------------- Edit ----------------
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handlePictureChanged = (event) => {
        event.preventDefault();
        setPictureChangedStatus(true);

        const fieldValue = event.target.files[0];

        setPictureChange(fieldValue);
    }

    //-------------------------------------


    const handleEditFormSubmit = async (event, card) => {
        event.preventDefault();
        console.log(pictureChangedStatus);

        if (!pictureChangedStatus) { // Picture Status Changed
            let editedCard = {
                id: editFormData.id,
                sort: editFormData.sort,
                cardName: editFormData.cardName,
                age: editFormData.age,
                dob: editFormData.dob,
                jobTitle: editFormData.jobTitle,
                employer: editFormData.employer,
                cityState: editFormData.cityState,
                email: editFormData.email,
                phoneNumber: editFormData.phoneNumber,
                pictureName: editFormData.pictureName,
            };

            const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
            console.log(id_token);

            //fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards' + '/' + `${editFormData.id}` + '/' + `${editFormData.sort}`, {
            fetch(`https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/${editFormData.id}/${editFormData.sort}`, {
                method: 'PUT',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + id_token 
                },
                body: JSON.stringify(editedCard)
            }).then(() => {
                console.log('Card Edited');
            }).catch(err => console.error(err))

            //let newCards = [...cards];
            //setCards(newCards);

            //const index = cards.findIndex((card)=> card.id === editCardId);

            //newCards[index] = editedCard;
            
            //setCards(newCards);
            //setEditCardId(null);
        }

        //------- Processing Image Upload ----------

        else if (pictureChangedStatus) { //& !pictureName) {
        

            // Get sub to append to picture name
            //      const sub = await Auth.currentAuthenticatedUser().then((user) => (user.attributes.sub));

            //Rename Image + Upload Image
            
            console.log("Start Image Upload")
            //const sort = uuidv4()
            try {
                //const result = await Storage.put(`${sub}---${sort}.png`, picture, {
                const result = await Storage.put(`${editFormData.id}---${editFormData.sort}.png`, pictureChange, {
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
                let editedCard = {
                    id: editFormData.id,
                    sort: editFormData.sort,
                    cardName: editFormData.cardName,
                    age: editFormData.age,
                    dob: editFormData.dob,
                    jobTitle: editFormData.jobTitle,
                    employer: editFormData.employer,
                    cityState: editFormData.cityState,
                    email: editFormData.email,
                    phoneNumber: editFormData.phoneNumber,
                    pictureName: result.key,
                };
        
                const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
                console.log(id_token);
        
                //fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards' + '/' + `${editFormData.id}` + '/' + `${editFormData.sort}`, {
                fetch(`https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/${editFormData.id}/${editFormData.sort}`, {
                    method: 'PUT',
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + id_token 
                    },
                    body: JSON.stringify(editedCard)
                }).then(() => {
                    console.log('Card Edited');
                }).catch(err => console.error(err))
        
                //let newCards = [...cards];
                //setCards(newCards);
                //event.target.reset();

                //const index = cards.findIndex((card)=> card.id === editCardId);

                //newCards[index] = editedCard;
                
                //setCards(newCards);
                //
                //      setEditCardId(null);
            } catch (error) {
                console.log("Image upload error:");
                console.log(error);
            } 
        }

        //---------- SHOULD BE REMOVED AND REPLACED WITH HISTORY BACK ONE STEP -----------------
        //Edited JSON data not appearing on edit 'save' (although edited/replaced image does appear on edit 'save')
        //So I'll just refresh the page in the meantime
        setTimeout(window.location.reload(), 2500);
    };

    //----------------Edit------------------
    //  Unused
    /*const handleEditClick = (event, card) => {
        event.preventDefault();
        setEditCardId(card.id + card.sort);

        const formValues = {
            id: card.id,
            sort: card.sort,
            cardName: card.cardName,
            age: card.age,
            dob: card.dob,
            jobTitle: card.jobTitle,
            employer: card.employer,
            cityState: card.cityState,
            email: card.email,
            phoneNumber: card.phoneNumber,
            pictureName: card.pictureName,
        }

        setEditFormData(formValues);
    }*/

    return ( 
        <div className="create" /*key={cardIdSort}*/>
            <h2>Update Card:</h2>
            { !card && <div>Loading...</div> }
            {card && (
                //card.map((card)=>
                <article key={1}>
                    <p>Test</p>
                    <p>{card.cardName}</p>
                    <p>{card.cardName}</p>

                    <form onSubmit={handleEditFormSubmit}>
                        {/*--- Might be a problem in including id and sort as input fields because this isn't where their value is coming from ---*/} 
                        <input 
                            //style={{display: 'none'}}
                            type="text"
                            name="id"
                            value={editFormData.id}
                            readOnly
                        />
                        <input 
                            //style={{display: 'none'}}
                            type="text"
                            name="sort"
                            value={editFormData.sort}
                            readOnly
                        />
                        <input 
                            type="text"
                            name="cardName"
                            required
                            placeholder="Enter name..."
                            //value={editFormData.cardName}
                            value={editFormData.card}
                            onChange={handleEditFormChange}
                        />
                        <input 
                            type="number"
                            name="age"
                            min={17}
                            max={125}
                            placeholder="Enter age..."
                            value={editFormData.age}
                            onChange={handleEditFormChange}
                        />
                        <input 
                            type="date"
                            name="dob"
                            placeholder="Enter date of birth..."
                            value={editFormData.dob}
                            onChange={handleEditFormChange}
                        />
                        <input 
                            type="text"
                            name="jobTitle"
                            required
                            placeholder="Enter job title..."
                            value={editFormData.jobTitle}
                            onChange={handleEditFormChange}
                        />
                        <input 
                            type="text"
                            name="employer"
                            required
                            placeholder="Enter employer..."
                            value={editFormData.employer}
                            onChange={handleEditFormChange}
                        />
                        <input 
                            type="text"
                            name="cityState"
                            placeholder="Enter city and state..."
                            value={editFormData.cityState}
                            onChange={handleEditFormChange}
                        />
                        <input 
                            type="email"
                            name="email"
                            required
                            placeholder="Enter email..."
                            value={editFormData.email}
                            onChange={handleEditFormChange}
                        />
                        <input 
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter phone number..."
                            value={editFormData.phoneNumber}
                            onChange={handleEditFormChange}
                        />
                        <input 
                            //style={{display: 'none'}}
                            type="text"
                            name="pictureName"
                            value={editFormData.pictureName}
                            onChange={handleEditFormChange}
                        />
                        <input 
                            type="file"
                            name="picture"
                            placeholder="Select Image"
                            accept="image/png, image/jpeg, image/jpg"
                            //value={pictureChange}
                            onChange={handlePictureChanged}
                            /*---   Maybe Change the onChange to handlePictureUpload something like that    ---*/ 
                        />
                        <button type="submit">Save</button>
                    </form>
                </article>
            //)
            )}
        </div>
    )
}
export default Update;

/*<form onSubmit={handleEditFormSubmit}>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards.map((card)=> (
                                <Fragment key={ `Fragment` + card.id + card.sort}>
                                    { editCardId === card.id + card.sort ? ( 
                                        <EditableRow 
                                            key={ `Editable` + card.id + card.sort}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            pictureChange={pictureChange}
                                            handlePictureChanged={handlePictureChanged}
                                            />
                                    ) : (
                                        <ReadOnlyRow 
                                            key={card.id + card.sort}
                                            card={card}
                                            handleEditClick={handleEditClick}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>*/