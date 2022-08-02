import { React } from "react";
//import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";

const EditableCard = ({ card, editFormData, handleEditFormChange, handleCancelClick, handlePictureChanged }) => {
    return ( 
    <div className="create">
        <h2>Update Card</h2>
        
        {/*<h2>{ card.cardName }</h2>
        <h3>Profession: { card.jobTitle }</h3>
        <div>Employer: { card.employer }</div>
        <div>Age: { card.age } years old</div>
        <div>Date of Birth: { card.dob }</div>
        <div>City, State: { card.cityState }</div>
        <div>Email: { card.email }</div>
        <div>Phone Number: { card.phoneNumber }</div>*/}

        {/*--- Might be a problem in including id and sort as input fields because this isn't where their value is coming from ---*/} 
        <label>ID:</label>
        <input 
            //style={{display: 'none'}}
            type="text"
            name="id"
            value={editFormData.id}
            readOnly
        />
        <label>Sort:</label>
        <input 
            //style={{display: 'none'}}
            type="text"
            name="sort"
            value={editFormData.sort}
            readOnly
        />
        <label>Name:</label>
        <input 
            type="text"
            name="cardName"
            required
            placeholder="Enter name..."
            value={editFormData.cardName}
            onChange={handleEditFormChange}
        />
        <label>Age:</label>
        <input 
            type="number"
            name="age"
            min={17}
            max={99}
            placeholder="Enter age..."
            value={editFormData.age}
            onChange={handleEditFormChange}
        />
        <label>Date of Birth:</label>
        <input 
            type="date"
            name="dob"
            placeholder="Enter date of birth..."
            value={editFormData.dob}
            onChange={handleEditFormChange}
        />
        <label>Job Title:</label>
        <input 
            type="text"
            name="jobTitle"
            required
            placeholder="Enter job title..."
            value={editFormData.jobTitle}
            onChange={handleEditFormChange}
        />
        <label>Employer:</label>
        <input 
            type="text"
            name="employer"
            required
            placeholder="Enter employer..."
            value={editFormData.employer}
            onChange={handleEditFormChange}
        />
        <label>City, State:</label>
        <input 
            type="text"
            name="cityState"
            placeholder="Enter city and state..."
            value={editFormData.cityState}
            onChange={handleEditFormChange}
        />
        <label>Email:</label>
        <input 
            type="email"
            name="email"
            required
            placeholder="Enter email..."
            value={editFormData.email}
            onChange={handleEditFormChange}
        />
        <label>Phone Number:</label>
        <input 
            type="tel"
            name="phoneNumber"
            placeholder="Enter phone number..."
            value={editFormData.phoneNumber}
            onChange={handleEditFormChange}
        />
        <label>Picture Name:</label>
        <input 
            //style={{display: 'none'}}
            type="text"
            name="pictureName"
            value={editFormData.pictureName}
            onChange={handleEditFormChange}
        />
        <label>New Picture (Leave blank to retain picture):</label>
        <input 
            type="file"
            name="picture"
            placeholder="Select Image"
            accept="image/png, image/jpeg, image/jpg"
            //value={pictureChange}
            onChange={handlePictureChanged}
            /*---   Maybe Change the onChange to handlePictureUpload something like that    ---*/ 
        />
        <button className="cancel-btn" type="button" onClick={handleCancelClick}>Cancel</button>
        <button type="submit">Save</button>
    </div>

            /*<div className="right">
                <div className="right-top">
                    {/* Renders, but little control, seems very depricated * /} 
                    <AmplifyS3Image imgKey={ card.pictureName }/>
                </div>
                <div className="right-bottom">
                    {/*<button className="delete-btn" onClick={() => { handleDelete(); Storage.remove(`${card.pictureName}`)}}>Delete</button>
                    <button className="edit-btn" onClick={(event)=> handleEditClick(event, card)}>Edit</button>
                    {/*<Link to={"/update/"+id+"/"+sort}><button className="edit-btn">Edit</button></Link>* /}
                </div>
            </div>*/

        /*
        <tr>
            <td>
                {/*--- Might be a problem in including id and sort as input fields because this isn't where their value is coming from ---* /} 
                <input 
                    //style={{display: 'none'}}
                    type="text"
                    name="id"
                    value={editFormData.id}
                    readOnly
                />
            </td>
            <td>
                <input 
                    //style={{display: 'none'}}
                    type="text"
                    name="sort"
                    value={editFormData.sort}
                    readOnly
                />
            </td>
            <td>
                <input 
                    type="text"
                    name="cardName"
                    required
                    placeholder="Enter name..."
                    value={editFormData.cardName}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    type="number"
                    name="age"
                    min={17}
                    max={99}
                    placeholder="Enter age..."
                    value={editFormData.age}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    type="date"
                    name="dob"
                    placeholder="Enter date of birth..."
                    value={editFormData.dob}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    type="text"
                    name="jobTitle"
                    required
                    placeholder="Enter job title..."
                    value={editFormData.jobTitle}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    type="text"
                    name="employer"
                    required
                    placeholder="Enter employer..."
                    value={editFormData.employer}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    type="text"
                    name="cityState"
                    placeholder="Enter city and state..."
                    value={editFormData.cityState}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email..."
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter phone number..."
                    value={editFormData.phoneNumber}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    //style={{display: 'none'}}
                    type="text"
                    name="pictureName"
                    value={editFormData.pictureName}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    type="file"
                    name="picture"
                    placeholder="Select Image"
                    accept="image/png, image/jpeg, image/jpg"
                    //value={pictureChange}
                    onChange={handlePictureChanged}
                    /*---   Maybe Change the onChange to handlePictureUpload something like that    ---* / 
                />
            </td>
            <td>
                <button type="submit">Save</button>
            </td>
        </tr>

        /*<tr>
            <td>
                <input 
                    type="text"
                    name="cardName"
                    required
                    placeholder="Enter name..."
                />
            </td>
            <td>
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
            </td>
            <td>
                <input
                    type="date"
                    name="dob"
                    placeholder="Date of birth..."
                    onChange={handleAddFormChange}
                    //value={dob}
                    //onChange={(e) => setDob(e.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="jobTitle"
                    required
                    placeholder="Enter job title..."
                    onChange={handleAddFormChange}
                    //value={jobTitle}
                    //onChange={(e) =>setJobTitle(e.target.value)}
                />
            </td>
                <input
                    type="text"
                    name="employer"
                    required
                    placeholder="Enter employer..."
                    onChange={handleAddFormChange}
                    //value={employer}
                    //onChange={(e) => setEmployer(e.target.value)}

                />
            </td>
            <td>
                <input
                    type="text"
                    name="cityState"
                    placeholder="Enter city and state..."
                    onChange={handleAddFormChange}
                    //value={cityState}
                    //onChange={(e) => setCityState(e.target.value)}
                />
            <td>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email..."
                    onChange={handleAddFormChange}
                    //value={email}
                    //onChange={(e) => setEmail(e.target.value)}
                />
            </td>
            <td>
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter phone number..."
                    onChange={handleAddFormChange}
                    //value={phoneNumber}
                    //onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </td>
            <td>
                <input
                    style={{display: 'none'}}
                    type="text"
                    name="pictureName"
                    onChange={handleAddFormChange}
                    //value={pictureName}
                    //onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </td>
            <td>
                <input
                    type="file"
                    name="picture"
                    placeholder="Select Image"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handlePicture}
                    //onChange={(e) => setPicture(e.target.files[0])}
                />
            </td>
        </tr>*/
    );
}
 
export default EditableCard;