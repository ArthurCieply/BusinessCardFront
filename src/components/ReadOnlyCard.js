import React from "react";
//import { Amplify, Auth, Storage } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";

const ReadOnlyCard = ({ card, handleEditClick, handleDeleteClick, handleDelete }) => {
    return (
    <div className="card-details" key={card.id + card.sort}>
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
                    {/* Renders, but little control, seems very depricated */} 
                    <AmplifyS3Image imgKey={ card.pictureName }/>
                </div>
                <div className="right-bottom">
                    {/*<button className="delete-btn" onClick={(e) => { handleDelete(); Storage.remove(`${card.pictureName}`)}}>Delete</button>*/}
                    
                    {/*  WORKS   */}
                    <button className="delete-btn" onClick={(e) => { e.preventDefault(); handleDelete(); Storage.remove(`${card.pictureName}`)}}>Delete</button>
                    {/*<button className="delete-btn" onClick={(e) => { handleDelete(e)}}>Delete</button>*/}
                    <button className="edit-btn" onClick={(event)=> handleEditClick(event, card)}>Edit</button>
                    {/*<Link to={"/update/"+id+"/"+sort}><button className="edit-btn">Edit</button></Link>*/}
                </div>
            </div>
        </div>
        
        {/*
        <p>{ card.id }</p>
        <p>{ card.sort }</p>
        <p>{ card.cardName }</p>
        <p>{ card.age }</p>
        <p>{ card.dob }</p>
        <p>{ card.jobTitle }</p>
        <p>{ card.employer }</p>
        <p>{ card.cityState }</p>
        <p>{ card.email }</p>
        <p>{ card.phoneNumber }</p>
        <p>{ card.pictureName }</p>
        <div className="table-image"><AmplifyS3Image imgKey={ card.pictureName }/></div>
        <div>
            <button type="button" onClick={(event)=> handleEditClick(event, card)}>Edit</button>
        </div>
        */}
    </div>
    );
}
 
export default ReadOnlyCard;
