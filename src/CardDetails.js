import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const CardDetails = () => {
    const { id } = useParams();
    const { data: card, error, isPending } = useFetch('https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id);
    const history = useHistory();

    const handleDelete= () => {
        fetch('https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards/' + id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return (
        <div className="card-details" key={card + id}>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { card && (
                card.map((card)=>
                    <article>
                        <h2>{ card.cardName }</h2>
                        <h3>Profession: { card.jobTitle }</h3>
                        <div>Employer: { card.employer }</div>
                        <div>Age: { card.age } years old</div>
                        <div>Date of Birth: { card.dob }</div>
                        <div>City, State: { card.cityState }</div>
                        <div>Email: { card.email }</div>
                        <div>Phone Number: { card.phoneNumber }</div>
                        <div>PROFILE PICTURE: { card.profilePicture }</div> 
                        <button className="delete-btn" onClick={handleDelete}>Delete</button>
                        
                        <Link to={"/update/"+id}><button className="edit-btn">Edit</button></Link>
                    </article>
                )
                /*<article>
                    <h2>{ card.name }</h2>
                    <h3>Profession: { card.profession }</h3>
                    <div>{ card.favoriteColor }</div>
                    <div>{ card.age }</div>
                </article>*/
                /*console.log({card})*/
            )}
        </div>
    );
}
 
export default CardDetails;