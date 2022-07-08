import CardList from './CardList';
import useFetch from './useFetch';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Amplify } from 'aws-amplify';
import { Authenticator  } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Auth from '@aws-amplify/auth';
Amplify.configure(awsExports);


const Home = () => {

    
    /*var fullUrl = window.location.href
    if (fullUrl == 'http://localhost:3000/') {
        console.log('Standard URL: ', fullUrl);
    } else {
        var id_token = fullUrl.split('=')[1].split('&')[0];
        console.log('ID Token: ', id_token);
    }*/
    
    /*const user = Auth.currentAuthenticatedUser();
    console.log(user);
    const token = user.signInUserSession.idToken.jwtToken;
    console.log(token);*/
    
    /*Auth.currentSession().then(data => console.log("Data :", data));
    Auth.currentSession().then(data => console.log("Access :", data.accessToken));
    Auth.currentSession().then(data => console.log("ID :", data.idToken));
    Auth.currentSession().then(data => console.log("JWT :", data.idToken.jwtToken));*/



    const { data: cards, isPending, error } = useFetch('https://780hvsuxgg.execute-api.us-east-1.amazonaws.com/Prod/cards', {
    method: 'GET',    
    headers: {
            //Old one     
            //"Authorization": 'eyJraWQiOiJtcmNpS3lHZ3g1bDNlbHQwdnBXOVp3QXFUNE9tR0lUMkFzb1I0UTBJaWJJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzZjU4NzNjYy1lNTc5LTQyYzgtOWE1MC1jYWMyNmI0ZjRlMjEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9CZXZzbkw5U2ciLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI1ZWc1Y2I4cTIwZW9wbmFjNGszZDRpcGs1aiIsImV2ZW50X2lkIjoiZmFkNjEzZTEtYjVmMC00MWRjLWEzMzgtOGM2ZWI3ZjUwZmQ3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY1NjYxNTcyNiwiZXhwIjoxNjU2NjE5MzI2LCJpYXQiOjE2NTY2MTU3MjYsImp0aSI6Ijk0Y2I1MWUzLTZhYTgtNDA3YS05N2NhLWE5ZWEyMjM2NTM2OCIsInVzZXJuYW1lIjoiYXJ0aHVyY2llcGx5MSJ9.a94eaARebwI4xfkxOKtQrsVkq2bAVYQuoMq0Q4nIXbQphyfpepxLc-w3yPrVEQzY1fCqlKklxZgHM5rAVVM0-RVEx1gakucBuRGYU8psz4Snj5rSGtJI7Trfxjf1zkjD6dq9qJxHVtfDRQ-7uyPZinqjDt7Xo-zA5lkdh4688lIxA4QylNBR8ivhLrQ4USEwE4FB6d-ga5xdkbweYEUE4LPM8yw1UV5iqrxeHOHWCEpV8nsNgM4cR9AKi8yLBg9VPxDkZY1K70a0LXpIXwe9zQyKN17XQMyQBF0YqyiKDP0KvA_bN5Xa4rxLQAXyOUd0qG-zfefEL8lT8zv52GlNGQ',
            //New Access Token
            //          "Authorization": 'eyJraWQiOiJtcmNpS3lHZ3g1bDNlbHQwdnBXOVp3QXFUNE9tR0lUMkFzb1I0UTBJaWJJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5NDVkOTgyNy1jNDdkLTQxNGYtYWYzMi1mZjE2MGRkYTEyMDYiLCJjb2duaXRvOmdyb3VwcyI6WyJHZW5lcmFsIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0JldnNuTDlTZyIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjVlZzVjYjhxMjBlb3BuYWM0azNkNGlwazVqIiwiZXZlbnRfaWQiOiJiNzQwMTU5Yi1kMWNiLTQ0ZjctYWVhYy1jOTI0NGRkZDI5OTUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjU2NzY5NjE5LCJleHAiOjE2NTY3NzMyMTksImlhdCI6MTY1Njc2OTYxOSwianRpIjoiMDFjZDg2NmItMmY5My00ZGZjLWI2ZWQtYjVmNWI2MDMyNGRiIiwidXNlcm5hbWUiOiJnZW5lcmFsIn0.TO2ti8Sp9ChJ6-3WxgDC90_2JwNdvrwLHotEDCw7yef4KT2L8jkWQEwu1DNhzB8bNHcHjjyRA2jOTV3bzHgAvT0qtkVGTuerPJZgQVCnwnDSsDw-xFA1r5Em6nK9YNPErTFTkCI421gjntaF7zpB4kQ0ylzV_mUWfJq6s7GqmnZUBXJUNhhOOtKVbiox3N23kIdmcn87Bs6tRExIcHxLKJvOuorz-Othn7xb617pxywlGR_cPV-xRvWzkGvxHpEW6hgUp3-RbTHpX453oZT69SG7y5w5yqRk0MCE8R2JoyvnBCdewn-1whstzP75j_Wvx6YFMIWu3wzjSCWL_c-0rg'
            "Content-Type": "application/json"
            //'Access-Control-Allow-Origin':'*',
            //'Access-Control-Allow-Methods':'POST,GET,OPTIONS'
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