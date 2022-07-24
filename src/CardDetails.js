import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { Amplify, Auth, Storage } from 'aws-amplify';
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import React from 'react';

const CardDetails = () => {
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
                                    {/* Renders, but little control, seems very depricated */}
                                    <AmplifyS3Image imgKey={ card.pictureName }/>
                                </div>
                                <div className="right-bottom">
                                    <button className="delete-btn" onClick={() => { handleDelete(); Storage.remove(`${card.pictureName}`)}}>Delete</button>
                                    <Link to={"/update/"+id+"/"+sort}><button className="edit-btn">Edit</button></Link>
                                </div>
                            </div>
                        </div>
                    </article>
                )
            )}
        </div>
    );
}
 
export default CardDetails;