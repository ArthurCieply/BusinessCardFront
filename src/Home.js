import CardList from './CardList';
import useFetch from './useFetch';

const Home = () => {
    const { data: cards, isPending, error } = useFetch('https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards');

    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {cards && <CardList cards={cards} title={"All Business Cards"} />}
        </div>
     );
}
 
export default Home;