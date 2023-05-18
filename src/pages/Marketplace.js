import React, { useEffect, useState } from 'react';

import {API, graphqlOperation} from 'aws-amplify'
import { listNFTS } from '../graphql/queries'
import * as queries from '../graphql/queries';

import './Marketplace.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@aws-amplify/ui-react/styles.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import Image1 from '../assets/galerias/1.jpeg'
import Image2 from '../assets/galerias/2.jpeg'
import Image3 from '../assets/destacados/3.jpeg'
import Image4 from '../assets/destacados/penguin1.avif'

const initialState = { contractadress: '', tokenID: '' }

let Galerias = [{
  Tipo:"Común",
  Imagen: Image1
}, 
{Tipo:"Básico",
Imagen: Image2}];




const Marketplace = () => {
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState(initialState)
  const [NFTs, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listNFTS))
      const NFTs = todoData.data.listNFTS.items
      setTodos(NFTs)
    } catch (err) { console.log('error fetching NFTs') }
  }

  async function verificarPrioridad(ido){
  try{
  const oneNFT = await API.graphql(
  graphqlOperation(queries.getNFT, { id: ido })
  );
   document.getElementById("usuario").value = oneNFT.data.getNFT.usuario
  }
  catch (err) { console.log('error') }}

  async function obtenerImagen(){

        const url = ''

      fetch("https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?contract_address=0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D&token_id=9999",{
        method:"GET",
        headers: {"Authorization": "Bearer LzL17RqKczs2-fqZi-BCMP4Fk4HPsZ8XiibsNFmuXhk6xuEi"}
        })
          .then(res => res.json())
          .then(
            (result) => {
            var url = result.data[0].image_url
            fetch("https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/"+url+"",{
              method:"GET",
              headers: {"Authorization": "Bearer LzL17RqKczs2-fqZi-BCMP4Fk4HPsZ8XiibsNFmuXhk6xuEi"}
              })
                .then(res=>{return res.blob()})
                .then(blob=>{
                  var img = URL.createObjectURL(blob);
                  // Do whatever with the img
                  document.getElementById('img').setAttribute('src', img);
                });

            },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // handle error
        }
      )


  }

  return(
    <div className='marketplacebody'>
        <h2 className='titulo'>Marketplace</h2>
        <div className='contenedortab'>
              <h4 className='titulo2'>Galerias</h4>
              <Row xs={0.75} md={5} className="justify-content-md-center" style={{marginLeft:70,marginRight:70}} >
            {Galerias.map( Galeria => {
              return(
              <Col>
                <Card style={{margin:10,}}>
                  <Card.Img variant="top" src={Galeria.Imagen} />
                  <Card.Header variant="light">{Galeria.Tipo}</Card.Header>
                  <Card.Body>
                    <Button variant='outline-success' >Comprar</Button>
                  </Card.Body>
                </Card>
              </Col>
              )
            })}
          </Row>
          <h4 className='titulo2'>NFT</h4>
            <Row xs={0.15} md={6} className="justify-content-md-center" style={{marginLeft:30,marginRight:30}} >
            {NFTs.map((NFT, index) => (
              <Col key={NFT.id ? NFT.id : index}>
                <Card style={{margin:5}}>
                  <Card.Img variant="top" src={Image4} />
                  <Card.Header><Card.Text>{NFT.contractadress}</Card.Text></Card.Header>
                  {NFT.tokenID}
                  <Card.Body>
                  <Button variant='outline-info' onMouseEnter={() => verificarPrioridad(NFT.id)} onClick={handleShow}>Detalles</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Información</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <InputGroup name="contractadress" className="mb-3" onChange={event => setInput('usuario', event.target.value)}>
                            <InputGroup.Text id="basic-addon1">Usuario:</InputGroup.Text>
                            <Form.Control
                            readOnly={true}
                            aria-describedby="basic-addon1"
                            name="usuario"
                            id='usuario'
                            />
                    </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant='outline-success'>Comprar</Button>
                    <Button variant="danger" onClick={handleClose} >
                        Cerrar
                    </Button>
                    </Modal.Footer>
        </Modal>
         </div>
    </div>
    );
}

export default Marketplace;