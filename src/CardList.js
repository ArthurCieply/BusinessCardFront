import { Link } from "react-router-dom";
import { Amplify, Auth, Storage } from 'aws-amplify';
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";

const CardList = ({ cards, title, handleDelete }) => {
    //const cards = props.cards;
    //const title = props.title;

    return ( 
        <div className="card-list">
            <h2>{ title }:</h2>
            {Array.isArray(cards) ? (cards).map((card) => (
                //<div className="card-preview" key={card.id.sort}>
                <div className="card-preview" key={card.id + card.sort}>  
                    <Link to={`/cards/${card.id}/${card.sort}`}>
                        <div className="left">
                            <h2>{ card.cardName }</h2>
                            <p>{ card.jobTitle }</p>
                        </div>
                        <div className="right">
                            <AmplifyS3Image imgKey={ card.pictureName }/>
                        </div>
                    </Link>
                </div>
            )) : null}
        </div>
     );
}
 
export default CardList;