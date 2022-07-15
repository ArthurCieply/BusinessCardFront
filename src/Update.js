import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { Amplify, Auth } from 'aws-amplify';

const Update = () => {
    const { id } = useParams();
    const { sort } = useParams(); 
    const { data: card, error, isPending } = useFetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort);
    const history = useHistory();
    const cardIdSort = id + sort;

    //{{ card && console.log(card) }};

    const [cardName, setCardName] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [employer, setEmployer] = useState('');
    const [cityState, setCityState] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    /*const [cardName, setCardName] = useState(`${card?.cardName}`);
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [employer, setEmployer] = useState('');
    const [cityState, setCityState] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState('');*/


    //const [id, setId] = useState(card?.id);
    //const [sort, setSort] = useState(card?.sort);
    //const [cardName, setCardName] = useState({cardName: `${card?.cardName}`});
    
    /*const [cardName, setCardName] = useState(card?.cardName);
    const [age, setAge] = useState(card?.age);
    const [dob, setDob] = useState(card?.dob);
    const [jobTitle, setJobTitle] = useState(card?.jobTitle);
    const [employer, setEmployer] = useState(card?.employer);
    const [cityState, setCityState] = useState(card?.cityState);
    const [email, setEmail] = useState(card?.email);
    const [phoneNumber, setPhoneNumber] = useState(card?.phoneNumber);
    const [profilePicture, setProfilePicture] = useState(card?.profilePicture);*/

    /*constructor(props) {
        super(props);
        this.state = { cardName: `${ card.cardName }` }
        this.state = { age: `${ card.age }` }
        this.state = { dob: `${ card.dob }` }
        this.state = { jobTitle: `${ card.jobTitle }` }
        this.state = { employer: `${ card.employer }` }
        this.state = { cityState: `${ card.cityState }` }
        this.state = { email: `${ card.email }` }
        this.state = { phoneNumber: `${ card.phoneNumber }` }
        this.state = { profilePicture: `${ card.profilePicture }` }
    };*/

    //const [isPending, setIsPending] = useState(false);


    const handleUpdate = async (e) => {
        e.preventDefault();
        const card = { id, sort, cardName, age, dob, jobTitle, employer, cityState, email, phoneNumber, profilePicture };
        
        //setIsPending(true);
        
        const id_token = await Auth.currentSession().then(data => (data.idToken.jwtToken));
        console.log(id_token);

        fetch('https://029pp6rcv1.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id + '/' + sort, {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + id_token
            },
            body: JSON.stringify(card)
        }).then(() => {
            history.push('/');
        }).catch(err => console.error(err))
    }

    return ( 
        <div className="create" key={cardIdSort}>
            <h2>Update Card:</h2>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { card && (
                card.map((card)=>
                    <article key={1}>
                        <form onSubmit={handleUpdate}>
                            <label>Name:</label>
                            <input
                                type="text"
                                required
                                //defaultValue={card.cardName}
                                value={cardName}
                                //value={cardName || `${card.cardName}`}
                                //placeholder='John Smith'
                                onChange={(e) => setCardName(e.target.value)}
                            />
                            <label>Age:</label>
                            <input
                                type="number"
                                min={17}
                                max={125}
                                /*min="17"
                                max="125"*/
                                //defaultValue={card.age}
                                value={age}
                                //value={age || `${card.age}`}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <label>Date of Birth:</label>
                            <input
                                type="date"
                                //defaultValue={card.dob}
                                value={dob}
                                //value={dob || `${card.dob}`}
                                onChange={(e) => setDob(e.target.value)}
                            />
                            <label>Job Title:</label>
                            <input
                                type="text"
                                required
                                //defaultValue={card.jobTitle}
                                value={jobTitle}
                                //value={jobTitle || `${card.jobTitle}`}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                            <label>Employer:</label>
                            <input
                                type="text"
                                required
                                //defaultValue={card.employer}
                                value={employer}
                                //value={employer || `${card.employer}`}
                                onChange={(e) => setEmployer(e.target.value)}

                            />
                            <label>City, State:</label>
                            <input
                                type="text"
                                //defaultValue={card.cityState}
                                value={cityState}
                                //value={cityState || `${card.cityState}`}
                                onChange={(e) => setCityState(e.target.value)}
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                required
                                //defaultValue={card.email}
                                value={email}
                                //value={email || `${card.email}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Phone Number:</label>
                            <input
                                type="tel"
                                //defaultValue={card.phoneNumber}
                                value={phoneNumber}
                                //value={phoneNumber || `${card.phoneNumber}`}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <label>***PROFILE PICTURE***:</label>
                            <input
                                type="file"
                                //defaultValue={card.profilePicture}
                                value={profilePicture}
                                //value={profilePicture || ''}
                                onChange={(e) => {
                                    setProfilePicture(e.target.files[0])}
                                    // File Validation (size, extension)
                                    
                                    // Add code here to upload file to server//
                                    //  PROFILE PICTURE LOGIC!!!!
                                    
                                }
                            />
                            { !isPending && <button>Update Card</button> }
                            { isPending && <button disabled>Updating Card...</button> }
                        </form>
                    </article>
                )
            )}
        </div>
     );
}
 
export default Update;
