import { React, useState, useEffect, Fragment } from "react";
//import useFetch from './useFetch';
import { Amplify, Auth, Storage } from 'aws-amplify';
//import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import { v4 as uuidv4 } from "uuid";
import Resizer from "react-image-file-resizer";
import awsExports from './aws-exports';
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import SortButton from "./components/SortButton";
import SortTableData from "./components/SortTableData";
import twoArrows from "./images/default.png"
Amplify.configure(awsExports);


//const Table = () => {
const SortableTable = ({ sortConfig }) => {

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

        //  Sub
        //const sub = await Auth.currentAuthenticatedUser().then((user) => (user.attributes.sub));
        //console.log(sub);

        setCards(jsonResult);
        setSortedCards(jsonResult);
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
    });

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
    const [editCardId, setEditCardId ] = useState(null);

    //---------------------------------------

    const [ picture, setPicture ] = useState();
    const [ pictureStatus, setPictureStatus ] = useState(false);

    const [ pictureChange, setPictureChange ] = useState();
    const [ pictureChangedStatus, setPictureChangedStatus ] = useState(false);

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
        const fieldValue = event.target.files[0];
        const image = await resizeFile(fieldValue);

        //const newPicture = { ...picture};
        //newPicture[fieldName] = fieldValue;

        setPicture(image);
    }

    //console.log("Outside: ", picture)
    
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    //--------------- Edit ----------------
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handlePictureChanged = async (event) => {
        event.preventDefault();
        setPictureChangedStatus(true);

        const fieldValue = event.target.files[0];
        const image = await resizeFile(fieldValue);

        setPictureChange(image);
    }

    //-------------------------------------


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
        //Edited JSON data not appearing on edit 'save' (although edited/replaced image does appear on edit 'save')
        //So I'll just refresh the page in the meantime
        setTimeout(window.location.reload(), 5000);
    };

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

            let newCards = [...cards];
            //setCards(newCards);

            const index = cards.findIndex((card)=> card.id === editCardId);

            newCards[index] = editedCard;
            
            setCards(newCards);
            setEditCardId(null);
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

                    //sort: sort,
                    //cardName: addFormData.cardName,
                    //age: addFormData.age,
                    //dob: addFormData.dob,
                    //jobTitle: addFormData.jobTitle,
                    //employer: addFormData.employer,
                    //cityState: addFormData.cityState,
                    //email: addFormData.email,
                    //phoneNumber: addFormData.phoneNumber,
                    //                                          pictureName: addFormData.pictureName, // ???Replace with newly created setPictureName(result.key)
                    //pictureName: result.key,
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
        
                let newCards = [...cards];
                //setCards(newCards);
                //event.target.reset();

                const index = cards.findIndex((card)=> card.id === editCardId);

                newCards[index] = editedCard;
                
                setCards(newCards);
                setEditCardId(null);
            } catch (error) {
                console.log("Image upload error:");
                console.log(error);
            } 
        }

        //Edited JSON data not appearing on edit 'save' (although edited/replaced image does appear on edit 'save')
        //So I'll just refresh the page in the meantime
        setTimeout(window.location.reload(), 5000);
    };

    //----------------Edit------------------
    const handleEditClick = (event, card) => {
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
    };

    const handleCancelClick = () => {
        setEditCardId(null);
    };

    //--------------------  Delete  --------------------

    const handleDelete = async (event, card) => {
        event.preventDefault();
        console.log(card.id);
        console.log(card.sort);

        const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
        console.log(id_token);

        await fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + card.id + '/' + card.sort, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + id_token
            }
        }).then(() => {
            //history.push('/');
            
            //Edited JSON data not appearing on edit 'save' (although edited/replaced image does appear on edit 'save')
            //So I'll just refresh the page in the meantime
            setTimeout(window.location.reload(), 5000);

        }).catch(err => console.error(err))
    }

    const handleDeleteClick = (cardId) => {
        const newCards = [...cards];

        const index = cards.findIndex((card)=> card.id === cardId);

        newCards.splice(index, 1);

        setCards(newCards);
    };

    //const handleEditClickPicture = (event,)

    //---------------------------------------------------

    //--------------------  Sorting  ---------------------

    //console.log(SortTableData(cards, { sortBy: 'jobTitle', direction: 'ascending' }))

    const shouldSort = sortConfig?.sortBy
    const tableData = shouldSort ? SortTableData(cards, sortConfig) : cards
    
    //const [ sortedCards, setSortedCards ] = useState(cards)
    const [ sortedCards, setSortedCards ] = useState([])
    const [ direction, setDirection ] = useState()
    const [ sortBy, setSortBy ] = useState()
    const { showSortUi } = sortConfig || {}

    //  Sorts
    //SortTableData(cards, { sortBy: 'cardName', direction: 'ascending' })
  
    const handleClick = (event) => {
        event.preventDefault();
        console.log("clicked");
        //console.log(sortDirection);
        const sortDirection = direction === 'descending' ? 'ascending' : 'descending'
        console.log("sortDirection: ", sortDirection);
        setDirection(sortDirection)
        console.log("Direction: ", direction);
        setSortBy(event.target.id)
        console.log("SortBy: ", sortBy);
        const sortConfig = { sortBy: event.target.id, direction: sortDirection }
        //const sortConfig = { sortBy: 'cardName', direction: 'descending' }
        console.log("sortConfig: ", sortConfig);
        setSortedCards(SortTableData(cards, sortConfig))
        console.log("sortedCards: ", sortedCards);
    }

    //---------------------------------------------------

    return ( 
        <div className="table">
            <h2>Table:</h2>
            { !cards && <div>Loading...</div> }
            {cards && 
                <form onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Card Creator (PK)</th>
                                <th>Card Sort (SK)</th>
                                <th>Name</th>
                                <th>Age<button direction={direction} id="age" className="btn-image" onClick={handleClick}><img src={twoArrows} alt="Cannot display sort arrows" id="age"/></button></th>
                                <th>Date of Birth</th>
                                {/*   Works   */}
                                <th>Job Title<button direction={direction} id="jobTitle" className="btn-image" onClick={handleClick}><img src={twoArrows} alt="Cannot display sort arrows" id="jobTitle"/></button></th>
                                {/*<th>Job Title<button direction={direction} id="jobTitle" className="btn-image" onClick={handleClick} sortBy={sortBy}><img src={twoArrows} alt="Cannot display sort arrows" id="jobTitle"/></button></th>*/}
                                {/*<th>
                                    Job Title{' '}
                                    {showSortUi && (
                                        <SortButton //  Not working
                                            direction={direction}
                                            id="jobTitle"
                                            onClick={handleClick}
                                            sortBy={sortBy}
                                        />
                                    )}
                                </th>*/}
                                <th>Employer<button direction={direction} id="employer" className="btn-image" onClick={handleClick}><img src={twoArrows} alt="Cannot display sort arrows" id="employer"/></button></th>
                                <th>City, State<button direction={direction} id="cityState" className="btn-image" onClick={handleClick}><img src={twoArrows} alt="Cannot display sort arrows" id="cityState"/></button></th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Profile Picture Name</th>
                                <th>Profile Picture</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*{cards.map((card)=> (*/}
                            {/*{tableData.map((card)=> (*/}
                            {sortedCards.map(card => (
                                <Fragment key={ `Fragment` + card.id + card.sort}>
                                    { editCardId === card.id + card.sort ? ( 
                                        <EditableRow 
                                            key={ `Editable` + card.id + card.sort}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            pictureChange={pictureChange}
                                            handlePictureChanged={handlePictureChanged}
                                            handleCancelClick={handleCancelClick}
                                            />
                                    ) : (
                                        <ReadOnlyRow 
                                            key={card.id + card.sort}
                                            card={card}
                                            handleDelete={handleDelete}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>
            }
            <h2>Add Card</h2>
            {/*<form onSubmit={handleAddFormSubmit}>*/}
            <div className="add-form">
                <form onSubmit={handleAddFormSubmit}>
                    <div className="input-field">
                        <label>Name:</label>
                        <input 
                            type="text"
                            name="cardName"
                            required
                            placeholder="Enter name..."
                            onChange={handleAddFormChange}
                        />
                    </div>
                    <div className="input-field">
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
                    </div>
                    <div className="input-field">
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
                    </div>
                    <div className="input-field">
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
                    </div>
                    <div className="input-field">
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
                    </div>
                    <div className="input-field">
                        <label>City, State:</label>
                        <input
                            type="text"
                            name="cityState"
                            placeholder="Enter city and state..."
                            onChange={handleAddFormChange}
                            //value={cityState}
                            //onChange={(e) => setCityState(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
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
                    </div>
                    <div className="input-field">
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter phone number..."
                            onChange={handleAddFormChange}
                            //value={phoneNumber}
                            //onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    {/*<div className="input-field">*/}
                    <div className="">
                        <input
                            style={{display: 'none'}}
                            type="text"
                            name="pictureName"
                            onChange={handleAddFormChange}
                            //value={pictureName}
                            /*onChange={(e) => setPhoneNumber(e.target.value)}*/
                        />
                    </div>
                    <div className="input-field">
                        <label>Profile Picture:</label>
                        <input
                            type="file"
                            name="picture"
                            placeholder="Select Image"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handlePicture}
                            //onChange={(e) => setPicture(e.target.files[0])}
                        />
                    </div>
                    <button className="edit-btn" type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}

export default SortableTable;