import CardList from './CardList';
import useFetch from './useFetch';

const Home = () => {
    const { data: cards, isPending, error } = useFetch('https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards', {
    method: 'GET',    
    headers: {
            "Authorization": 'eyJraWQiOiJtcmNpS3lHZ3g1bDNlbHQwdnBXOVp3QXFUNE9tR0lUMkFzb1I0UTBJaWJJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzZjU4NzNjYy1lNTc5LTQyYzgtOWE1MC1jYWMyNmI0ZjRlMjEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9CZXZzbkw5U2ciLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI1ZWc1Y2I4cTIwZW9wbmFjNGszZDRpcGs1aiIsImV2ZW50X2lkIjoiZmFkNjEzZTEtYjVmMC00MWRjLWEzMzgtOGM2ZWI3ZjUwZmQ3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY1NjYxNTcyNiwiZXhwIjoxNjU2NjE5MzI2LCJpYXQiOjE2NTY2MTU3MjYsImp0aSI6Ijk0Y2I1MWUzLTZhYTgtNDA3YS05N2NhLWE5ZWEyMjM2NTM2OCIsInVzZXJuYW1lIjoiYXJ0aHVyY2llcGx5MSJ9.a94eaARebwI4xfkxOKtQrsVkq2bAVYQuoMq0Q4nIXbQphyfpepxLc-w3yPrVEQzY1fCqlKklxZgHM5rAVVM0-RVEx1gakucBuRGYU8psz4Snj5rSGtJI7Trfxjf1zkjD6dq9qJxHVtfDRQ-7uyPZinqjDt7Xo-zA5lkdh4688lIxA4QylNBR8ivhLrQ4USEwE4FB6d-ga5xdkbweYEUE4LPM8yw1UV5iqrxeHOHWCEpV8nsNgM4cR9AKi8yLBg9VPxDkZY1K70a0LXpIXwe9zQyKN17XQMyQBF0YqyiKDP0KvA_bN5Xa4rxLQAXyOUd0qG-zfefEL8lT8zv52GlNGQ',
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,GET,OPTIONS'
                //Errors when using cognito user pool authorizers on api method & +OAuth Scopes : email (Works in postman with Authorization Header and access Key)
            // Access to fetch at 'https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
            // GET https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards net::ERR_FAILED 401
        }
    });

    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {cards && <CardList cards={cards} title={"All Business Cards"} />}
        </div>
     );
}
 
export default Home;