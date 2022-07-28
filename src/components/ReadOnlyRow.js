import React from "react";
import { Amplify, Auth, Storage } from 'aws-amplify';
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";

const ReadOnlyRow = ({ card, handleEditClick, handleDeleteClick, handleDelete }) => {
    return (
    <tr key={card.id + card.sort}>
        <td className="long">{ card.id }</td>
        <td className="long">{ card.sort }</td>
        <td>{ card.cardName }</td>
        <td>{ card.age }</td>
        <td>{ card.dob }</td>
        <td>{ card.jobTitle }</td>
        <td>{ card.employer }</td>
        <td>{ card.cityState }</td>
        <td>{ card.email }</td>
        <td>{ card.phoneNumber }</td>
        <td className="long">{ card.pictureName }</td>
        <td className="table-image"><AmplifyS3Image imgKey={ card.pictureName }/></td>
        <td>
            <button className="edit-btn" type="button" onClick={(event)=> handleEditClick(event, card)}>Edit</button>
            <button className="delete-btn" type="button" onClick={(event)=> { event.preventDefault(); handleDelete(event, card); Storage.remove(`${card.pictureName}`)}} >Delete</button> {/*    handleDeleteClick(card.id)   */} 
        </td>
    </tr>
    );
}
 
export default ReadOnlyRow;
