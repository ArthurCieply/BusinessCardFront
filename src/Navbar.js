import { Link } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator  } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const Navbar = ( signOut, user ) => {
    return ( 
        <nav className="navbar">
            {/*<Link to="/"><h1>Business Cards</h1></Link>*/}
            <Link to="/BusinessCardFront/"><h1>Business Cards</h1></Link>
            <div className="links">
                {/*<Link to="/">Home</Link>
                <Link to="/table">Table</Link>
                <Link to="/create" style={{ 
                    color: "white",
                    backgroundColor: "#3867d5",
                    borderRadius: '5px'
                }}>New Card</Link>*/}
                <Link to="/BusinessCardFront/">Home</Link>
                <Link to="/BusinessCardFront/table">Table</Link>
                <Link to="/BusinessCardFront/create" className='create-link'><button className='new-btn'>New Card</button></Link>
                {/*<a href='https://businesscardapp.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=(5eg5cb8q20eopnac4k3d4ipk5j)&redirect_uri=(http://localhost:3000/)'>Login</a>*/}
                {/* Old Pool */} 
                {/*<a href='https://businesscardapp.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=5eg5cb8q20eopnac4k3d4ipk5j&redirect_uri=http://localhost:3000/&client_secret=pmisr462v1flhn257mft9j0pl1cb6c8c8brpr361k2qs9499d8k'>Login</a>*/}

                {/* New Pool 
                <a href='https://businesscards.auth.us-east-1.amazoncognito.com'>Login</a>
                 */}

                {/*<a href='http://localhost:3000/signout/'>Logout</a>*/}
                {/*<button onClick={signOut}>Sign out</button>
                <h3>Hello {user.username}</h3>*/}
                    {/*<Authenticator>
                        {({ signOut, user }) => (
                            <main>
                            {/ *<h3>Hello {user.username}</h3>* /}
                            <button onClick={signOut}  style={{ 
                    color: "white",
                    backgroundColor: "#c98104",
                    borderRadius: '5px'
                 }}>Sign Out</button>
                            </main>
                        )}
                    </Authenticator>*/}
                    <div className='signout-container'>
                        <Authenticator>
                            {({ signOut, user }) => (
                                <main>
                                {/*<h3>Hello {user.username}</h3>*/}
                                <button onClick={signOut} className="sign-btn">Sign Out</button>
                                </main>
                            )}
                        </Authenticator>
                    </div>
            </div>
        </nav>
     );
}
 
export default Navbar;