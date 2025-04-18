import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Nav from './components/Nav/Nav.jsx';
import Favorites from './components/Favorites/Favorites.jsx';
import Signup from './components/Signup/Signup.jsx';
import Signin from './components/Signin/Signin.jsx';
import Footer from './components/Footer/Footer.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import Profile from './components/Profile/Profile.jsx';
import NewListing from './components/NewListing/NewListing.jsx';
import Cart from './components/Cart/Cart.jsx';
import MyListings from './components/MyListings/MyListings.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Privacy from './components/Privacy/Privacy.jsx';
import Favourites from './components/Favourites/Favourites.jsx';
import EditListing from './components/EditListing/EditListing.jsx';
import Services from './components/Sertvices/Services.jsx'; 
import FAQ from './components/Faq/Faq.jsx';
import HelpCenter from './components/Help/Help.jsx';

const MainRouter = () => {
    return (
        <div>
            <Nav />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path="*" element={<NotFound />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/favorites" element={<Favorites />} />
                <Route exact path="/newListing" element={<NewListing />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/myListings" element={<MyListings />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/privacy" element={<Privacy />} />
                <Route exact path="/favourites" element={<Favourites />} />
                <Route path="/listings/edit/:listingId" element={<EditListing />} />
                <Route exact path="/services" element={<Services />} /> 
                <Route exact path="/faq" element={<FAQ />} />
                <Route exact path="/help" element={<HelpCenter />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default MainRouter;
