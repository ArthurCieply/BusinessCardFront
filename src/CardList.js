import { Link } from "react-router-dom";

const CardList = ({ cards, title, handleDelete }) => {
    //const cards = props.cards;
    //const title = props.title;

    return ( 
        <div className="card-list">
            <h2>{ title }:</h2>
            {cards.map((card) => (
                <div className="card-preview" key={card.id}>
                    <Link to={`/cards/${card.id}`}>
                        <h2>{ card.cardName }</h2>
                        <p>{ card.jobTitle }</p>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default CardList;