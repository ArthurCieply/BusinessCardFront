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
            </div>
        </nav>
     );
}
 
export default Navbar;