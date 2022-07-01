import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <Link to="/"><h1>Business Cards</h1></Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create" style={{ 
                    color: "white",
                    backgroundColor: "#3867d5",
                    borderRadius: '5px'
                 }}>New Card</Link>
                {/*<a href='https://businesscardapp.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=(5eg5cb8q20eopnac4k3d4ipk5j)&redirect_uri=(http://localhost:3000/)'>Login</a>*/}
                <a href='https://businesscardapp.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=5eg5cb8q20eopnac4k3d4ipk5j&redirect_uri=http://localhost:3000/&client_secret=pmisr462v1flhn257mft9j0pl1cb6c8c8brpr361k2qs9499d8k'>Login</a>

            </div>
        </nav>
     );
}
 
export default Navbar;