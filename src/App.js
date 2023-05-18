import './App.scss';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaShoppingCart,FaBullhorn,FaAward,FaRegUser, FaSignOutAlt,FaWarehouse, FaPalette , FaPaintBrush} from 'react-icons/fa'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Routes, Route, Link } from 'react-router-dom';
import Marketplace from './pages/Marketplace';
import Home from './pages/Home';
import Anuncios from './pages/Anuncios';
import NFT from './pages/inventario/NFT';
import Galeria from './pages/inventario/Galeria';
import Informacion from './pages/perfil/Informacion';
import Logros from './pages/perfil/Logros';



import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';

I18n.putVocabularies(translations);
I18n.setLanguage('es');



function App({signOut}) {


  return (
    <>
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className={(navData) => (navData.isActive ? "active-style" : 'none')}>BlockArt</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{}}
            navbarScroll
          >
            <Nav.Link as={Link} to="/marketplace" className="hurray"><FaShoppingCart /> Marketplace</Nav.Link>
            <Nav.Link as={Link} to="/anuncios"><FaBullhorn /> Anuncios</Nav.Link>
            
            <NavDropdown title='Inventario' id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/inventario/NFTs"><FaPalette /> NFT</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/inventario/galerias"><FaWarehouse /> Galeria</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/inventario/token" disabled><FaPaintBrush />  Token
              </NavDropdown.Item>
            </NavDropdown>   
            <NavDropdown title="Perfil" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/perfil/informacion"><FaRegUser /> Informacion</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/perfil/logros" disabled><FaAward /> Logros</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
              <Button variant='outline-danger' onClick={signOut} ><FaSignOutAlt width='1x' /> Cerrar sesion</Button>
              </NavDropdown.Item>
            </NavDropdown>     
          </Nav>

        {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success"><FaSearch width='1x' /></Button>
        </Form> */}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="marketplace" element={<Marketplace />}></Route>
      <Route path="anuncios" element={<Anuncios/>}></Route>
      <Route path="inventario">
        <Route path="NFTs" element={<NFT/>}></Route>
        <Route path="galerias" element={<Galeria/>}></Route>
      </Route>
      <Route path="perfil">
      <Route path="informacion" element={<Informacion/>}></Route>
        <Route path="logros" element={<Logros/>}></Route>
      </Route>
    </Routes>
    </>
    
  );

}




export default withAuthenticator(App);

//<div>
//<p>Hola! {user.attributes.email}</p>
//<button onClick={signOut}>Cerrar sesion</button>
//</div>

