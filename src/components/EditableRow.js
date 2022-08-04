import { React } from "react";

const EditableRow = ({ card, editFormData, handleEditFormChange, handleCancelClick, handlePictureChanged }) => {
    return ( 
        <tr>
            <td className="long">
                {/*--- Might be a problem in including id and sort as input fields because this isn't where their value is coming from ---*/} 
                {/*<input 
                    //style={{display: 'none'}}
                    type="text"
                    className="long-short"
                    name="id"
                    value={editFormData.id}
                    readOnly
                />*/}
                <textarea 
                    //style={{display: 'none'}}
                    id="" cols="45" rows="7"
                    type="text"
                    className="long-short"
                    name="id"
                    value={editFormData.id}
                    readOnly
                />
            </td>
            <td className="long">
                {/*<input 
                    //style={{display: 'none'}}
                    type="text"
                    name="sort"
                    className="long-short"
                    value={editFormData.sort}
                    readOnly
                />*/}
                <textarea 
                    //style={{display: 'none'}}
                    id="" cols="45" rows="7"
                    type="text"
                    name="sort"
                    className="long-short"
                    value={editFormData.sort}
                    readOnly
                />
            </td>
            <td>
                {/*<input 
                    type="text"
                    name="cardName"
                    required
                    placeholder="Enter name..."
                    value={editFormData.cardName}
                    onChange={handleEditFormChange}
                />*/}
                <textarea 
                    type="text"
                    id="" cols="65" rows="4"
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
                    id="age-input"
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
                    min={"1923-01-01"}
                    max={"2006-01-01"}
                    placeholder="Enter date of birth..."
                    value={editFormData.dob}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                {/*<input 
                    type="text"
                    name="jobTitle"
                    required
                    placeholder="Enter job title..."
                    value={editFormData.jobTitle}
                    onChange={handleEditFormChange}
                />*/}
                <textarea 
                    type="text"
                    id="" cols="48" rows="4"
                    name="jobTitle"
                    required
                    placeholder="Enter job title..."
                    value={editFormData.jobTitle}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                {/*<input 
                    type="text"
                    name="employer"
                    required
                    placeholder="Enter employer..."
                    value={editFormData.employer}
                    onChange={handleEditFormChange}
                />*/}
                <textarea 
                    type="text"
                    id="" cols="48" rows="4"
                    name="employer"
                    required
                    placeholder="Enter employer..."
                    value={editFormData.employer}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                {/*<input 
                    type="text"
                    name="cityState"
                    placeholder="Enter city and state..."
                    value={editFormData.cityState}
                    onChange={handleEditFormChange}
                />*/}
                <textarea 
                    type="text"
                    id="" cols="100" rows="4"
                    name="cityState"
                    placeholder="Enter city and state..."
                    value={editFormData.cityState}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                {/*<input 
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email..."
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                />*/}
                <textarea 
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
            <td className="long">
                {/*<input 
                    //style={{display: 'none'}}
                    type="text"
                    className="long-short"
                    name="pictureName"
                    value={editFormData.pictureName}
                    onChange={handleEditFormChange}
                />*/}
                <textarea
                    id="" cols="45" rows="7"
                    type="text"
                    /*className="long-short"*/
                    name="pictureName"
                    value={editFormData.pictureName}
                    onChange={handleEditFormChange}
                />
            </td>
            {/*<td className="long">*/}
            <td>
                <input 
                    type="file"
                    name="picture" 
                    //className="long-short"
                    placeholder="Select Image"
                    accept="image/png, image/jpeg, image/jpg"
                    //value={pictureChange}
                    onChange={handlePictureChanged}
                    /*---   Maybe Change the onChange to handlePictureUpload something like that    ---*/ 
                />
            </td>
            <td>
                <div className="action-buttons">
                    <button className="cancel-btn" type="button" onClick={handleCancelClick}>Cancel</button>
                    <button className="save-btn table-btn-margin-left" type="submit">Save</button>
                </div>
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
 
export default EditableRow;