
import React, { useEffect, useState } from 'react';
import {API, graphqlOperation} from 'aws-amplify'
import { listNFTS} from '../graphql/queries'
import * as queries from '../graphql/queries';


import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@aws-amplify/ui-react/styles.css';


import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import Image3 from '../assets/destacados/3.jpeg'

import Image1 from '../assets/destacados/1.webp'

import MobileStoreButton from "react-mobile-store-button";

import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);


const Home = () => {
      const iOSUrl = "";
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      
      const initialState = { usario: ''}
      const [formState, setFormState] = useState(initialState)

      function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
      }

      const [NFTs, setTodos] = useState([])
      const [NFTs2, setTodos2] = useState([])

      useEffect(() => {
        fetchTodos()
      }, [])

      async function fetchTodos() {
        try {
          const todoData = await API.graphql(graphqlOperation(listNFTS,{filter: {prioridad: {eq:1}}}))
          const todoData2 = await API.graphql(graphqlOperation(listNFTS,{filter: {prioridad: {eq:2}}}))
          const NFTs = todoData.data.listNFTS.items
          const NFTs2 = todoData2.data.listNFTS.items
          setTodos(NFTs)
          setTodos2(NFTs2)
          if( todoData.data.listNFTS.items.length !== 0){
            document.getElementById('text').style.display='none'
          }
          if( todoData2.data.listNFTS.items.length !== 0){
            document.getElementById('texto').style.display='none'
          }
        } catch (err) { console.log('error fetching NFTs') }
      }

      async function verificarPrioridad(ido){
        try{
          const oneNFT = await API.graphql(
            graphqlOperation(queries.getNFT, { id: ido })
          );
          document.getElementById("usuario").value = oneNFT.data.getNFT.usuario
          
        }
        catch (err) { console.log('error') }
      }
    return(
    <div className="BodyHome">
    <h1 style={{textAlign: 'center', color: 'white', paddingTop: 100, paddingBottom:10,}}>Promocionados</h1>
    <h4 id='text' style={{textAlign: 'center', color: 'white', paddingTop: 10, paddingBottom:10,}}>No existen articulos promocionados en este momento..</h4>
    <Row xs={0.75} md={6} className="justify-content-md-center" style={{marginTop:10,marginLeft:20,marginRight:20}} >
                {NFTs.map((NFT, index) => (
                <Col key={NFT.id ? NFT.id : index}>
                <Card style={{margin:10,}}>
                    <Card.Img variant="top" src={Image1} />
                    <Card.Header>{NFT.contractadress} - {NFT.tokenID} </Card.Header>
                    <Card.Body>
                      <Card.Text>
                      <Button variant="info" onMouseEnter={() => verificarPrioridad(NFT.id)} onClick={handleShow}>
                        Información
                      </Button>
                      </Card.Text>
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
                    <Button variant="danger" onClick={handleClose} >
                        Cerrar
                    </Button>
                    </Modal.Footer>
                </Modal>

    <h3 style={{textAlign: 'center', marginTop:100,  color: 'white',}}>Destacados semanales</h3>
    <h4 id='texto' style={{textAlign: 'center', color: 'white', paddingTop: 10, paddingBottom:10,}}>No hay articulos semanales destacados en este momento..</h4>
    <Row xs={0.75} md={6} className="justify-content-md-center" style={{marginTop:10,marginLeft:20,marginRight:20}} >
                {NFTs2.map((NFT, index) => (
                <Col key={NFT.id ? NFT.id : index}>
                <Card style={{margin:10,}}>
                    <Card.Img variant="top" src={Image3} />
                    <Card.Header>{NFT.contractadress} - {NFT.tokenID} </Card.Header>
                    <Card.Body>
                      <Card.Text>
                      <Button variant="info" onMouseEnter={() => verificarPrioridad(NFT.id)} onClick={handleShow}>
                        Información
                      </Button>
                      </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                ))}
    </Row>


      <h4 style={{textAlign: 'center', marginTop:40,  color: 'white',}}>Descarga la APP</h4>
      <Row xs={0.75} md={3} className="justify-content-md-center" style={{marginLeft:20,marginRight:20 ,}} >
      <div className='descargasbotones'>
  
        <MobileStoreButton
          store="android"
          url={iOSUrl}
          style={{ width: "600px", height: "100px" }}
          linkProps={{ title: "google Store Button" }}
        />
        <MobileStoreButton
          store="ios"
          url={iOSUrl}
          style={{ width: "500px", height: "100px" }}
          linkProps={{ title: "iOS Store Button" }}
        />
      </div>
      </Row>

    </div>
    );
}

export default Home;