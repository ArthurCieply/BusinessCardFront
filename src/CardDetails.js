import { useState, useEffect, React, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
//import useFetch from "./useFetch";
//import { Link } from "react-router-dom";
import { Amplify, Auth, Storage } from 'aws-amplify';
//import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import Resizer from "react-image-file-resizer";
import awsExports from './aws-exports';
import ReadOnlyCard from "./components/ReadOnlyCard";
import EditableCard from "./components/EditableCard";
Amplify.configure(awsExports);

const CardDetails = () => {

    const { id } = useParams();
    const { sort } = useParams(); 
    const history = useHistory();
    const cardIdSort = id + sort;
    const [ load, setLoad ] = useState(false);
    const [ card, setCard ] = useState({
        id: '',
        sort: '',
        cardName: 'x',
        age: '',
        dob: '',
        jobTitle: '',
        employer: '',
        cityState: '',
        email: '',
        phoneNumber: '',
        pictureName: '',
    });

    const [editCard, setEditCard ] = useState(false);
    const [ pictureChange, setPictureChange ] = useState();
    const [ pictureChangedStatus, setPictureChangedStatus ] = useState(false);
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


    useEffect(() => {
        fetchData();
        console.log(card);
    }, []);

    const fetchData = async () => {
        const result = await fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort, {
            method: 'GET',    
            headers: {
                "Content-Type": "application/json"
            }
        });
        const jsonResult = await result.json();

        console.log(jsonResult);

        //  Sub
        //const sub = await Auth.currentAuthenticatedUser().then((user) => (user.attributes.sub));
        //console.log(sub);

        setCard(jsonResult);
        setLoad(true);
        //console.log(card);
    };


    //----------------Edit------------------
    const handleEditClick = (event, card) => {
        event.preventDefault();
        setEditCard(true);

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
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const resizeFile = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
        uri => {
          resolve(uri);
        }, 'file' );
    });

    const handlePictureChanged = async (event) => {
        event.preventDefault();
        setPictureChangedStatus(true);

        const fieldValue = event.target.files[0];
        const image = await resizeFile(fieldValue);

        setPictureChange(image);
    }

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
            setEditCard(false);
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
        
                //let newCards = [...cards];
                //setCards(newCards);
                //event.target.reset();

                //const index = cards.findIndex((card)=> card.id === editCardId);

                //newCards[index] = editedCard;
                
                //setCards(newCards);
                setEditCard(false);
            } catch (error) {
                console.log("Image upload error:");
                console.log(error);
            } 
        }

        //Edited JSON data not appearing on edit 'save' (although edited/replaced image does appear on edit 'save')
        //So I'll just refresh the page in the meantime
        //setTimeout(window.location.reload(), 2500);
        //history.push('/');
        history.push('/BusinessCardFront/');
        setTimeout(window.location.reload(), 2500);
    };

    const handleCancelClick = () => {
        setEditCard(false);
    }

    //-------------------------------------

    //------------ Delete -----------------

    const handleDelete = async (e) => {
        //e.preventDefault();
        const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
        console.log(id_token);

        fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + id_token
            }
        }).then(() => {
            //history.push('/');
            history.push('/BusinessCardFront/');
        }).catch(err => console.error(err))
    }

    //-------------------------------------


    return (
        <div className="card-details" key={cardIdSort}>
            { !load && <div>Loading...</div> }
            { load && 
                <div>
                    {/*<form onSubmit={handleEditFormSubmit}>*/}
                    <form onSubmit={handleEditFormSubmit}>
                        {card.map((card)=> (
                            <Fragment key={ `Fragment` + card.id + card.sort}>
                                {/*{ editCardId === card.id + card.sort ? (*/}
                                { editCard === true ? ( 
                                    <EditableCard 
                                        key={ `Editable` + card.id + card.sort}
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        pictureChange={pictureChange}
                                        handlePictureChanged={handlePictureChanged}
                                        handleCancelClick={handleCancelClick}
                                        />
                                ) : (
                                    <ReadOnlyCard 
                                        key={card.id + card.sort}
                                        card={card}
                                        handleEditClick={handleEditClick}
                                        handleDelete={handleDelete}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </form>
                </div>
            }
        </div>
    );
}

export default CardDetails;

/*const CardDetails = () => {
    const { id } = useParams();
    const { sort } = useParams(); 
    const { data: card, error, isPending } = useFetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort);
    const history = useHistory();
    const cardIdSort = id + sort;
   
    const handleDelete = async (e) => {
        //e.preventDefault();
        const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
        console.log(id_token);

        fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + id_token
            }
        }).then(() => {
            history.push('/');
        }).catch(err => console.error(err))
    }

    return (
        <div className="card-details" key={cardIdSort}>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { card && (
                card.map((card)=>
                    <article key={1}>
                        <div className="output">
                            <div className="left">
                                <h2>{ card.cardName }</h2>
                                <h3>Profession: { card.jobTitle }</h3>
                                <div>Employer: { card.employer }</div>
                                <div>Age: { card.age } years old</div>
                                <div>Date of Birth: { card.dob }</div>
                                <div>City, State: { card.cityState }</div>
                                <div>Email: { card.email }</div>
                                <div>Phone Number: { card.phoneNumber }</div>
                            </div>

                            <div className="right">
                                <div className="right-top">
                                    {/* Renders, but little control, seems very depricated * /} 
                                    <AmplifyS3Image imgKey={ card.pictureName }/>
                                </div>
                                <div className="right-bottom">
                                    <button className="delete-btn" onClick={() => { handleDelete(); Storage.remove(`${card.pictureName}`)}}>Delete</button>
                                    <button className="edit-btn">Edit</button>
                                    {/*<Link to={"/update/"+id+"/"+sort}><button className="edit-btn">Edit</button></Link>* /}
                                </div>
                            </div>
                        </div>
                    </article>
                )
            )}
        </div>
    );
}
 
export default CardDetails;*/