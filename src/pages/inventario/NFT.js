import React, { useEffect, useState } from 'react';
import {API, graphqlOperation} from 'aws-amplify'
import { createNFT } from '../../graphql/mutations'
import { listNFTS} from '../../graphql/queries'
import * as mutations from '../../graphql/mutations';
import { withAuthenticator } from '@aws-amplify/ui-react';

import './NFT.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@aws-amplify/ui-react/styles.css';

import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Image1 from '../../assets/globales/1.webp'
import Image2 from '../../assets/miNFT/person1.avif'


import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
Amplify.configure(awsExports);



const InventarioNFT = ({user}) => {
  
  const variable = (user.username)
  const initialState = { contractadress: '', tokenID: '' ,prioridad:'0', usuario:variable}

  const [formState, setFormState] = useState(initialState)
  const [NFTs, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
    VerificarCantidad()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function VerificarCantidad(){
    try {
    const todoData = await API.graphql(graphqlOperation(listNFTS,{filter: {usuario: {eq: user.username}}}))
    const NFTs = todoData.data.listNFTS.items
    if(NFTs.length === 2){
      document.getElementById('contenedortab').style.display = 'none'
    }
    if(NFTs.length === 0){
      document.getElementById('text').style.display = 'none'
    }
    }
    catch (err) { console.log('error') }
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listNFTS,{filter: {usuario: {eq: user.username}}}))
      const NFTs = todoData.data.listNFTS.items
      setTodos(NFTs)
    } catch (err) { console.log('error fetching NFTs') }
  }

  async function addNFT() {
    try {
      handleShow2()
      if (!formState.contractadress || !formState.tokenID) return
      const NFT = { ...formState }
      setTodos([...NFTs, NFT])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createNFT, {input: NFT}))
      handleClose()
      window.location.reload();
      
    } catch (err) {
      console.log('error creating NFT:', err)
    }
  }

  async function restNFT(ido) {
    try {
      const todoNFT = {
        id: ido,
      };
      await API.graphql({ query: mutations.deleteNFT, variables: {input: todoNFT}});
      window.location.reload();
    } catch (err) {
      console.log('error delete NFT:', err)
    }
  }


    const [show2, setShow2] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <div className='marketplacebody'>
            <h2 className='titulo'>NFT</h2>
            <div className='contenedor'>
            <div className='contenedortab' id='contenedortab'>
            <h4 id='texto' style={{textAlign: 'center', color: 'white', paddingTop: 20, paddingBottom:10,}}>Agregar un NFT</h4>
            <Row xs={0.75} md={5} className="justify-content-md-center" style={{marginTop:10,marginLeft:20,marginRight:20}} >
            {Array.from({ length: 1 }).map((_, idx) => (
                <Col key={idx}>
                <Card style={{margin:10,}}>
                    <Card.Img variant="top" src={Image1} />
                    <Card.Header variant="light"><Button variant='dark' onClick={handleShow}>Cargar mi NFT</Button></Card.Header>
                </Card>
                </Col>
            ))}
            </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cargar articulo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup name="contractadress" className="mb-3" value={formState.contractadress} onChange={event => setInput('contractadress', event.target.value)}>
                            <InputGroup.Text id="basic-addon1">Contract Address</InputGroup.Text>
                            <Form.Control
                            placeholder="0x1A92f7381B9F03921564a437210bB9396471050C"
                            aria-describedby="basic-addon1"
                            name="contractadress"
                            />
                        </InputGroup>
                        <InputGroup name="tokenID" className="mb-3"  value={formState.tokenID} onChange={event => setInput('tokenID', event.target.value)}>
                        <InputGroup.Text id="basic-addon1">Token ID</InputGroup.Text>
                            <Form.Control
                            placeholder="6288"
                            aria-describedby="basic-addon1"
                            name="tokenID"
                            />
                        </InputGroup>
                        <div
                          aria-live="polite"
                          aria-atomic="true"
                          className="bg-white position-relative"
                          style={{ minHeight: '100px' }}
                        >
                          <ToastContainer className="p-3" position="middle-center" show={show2} onHide={handleClose2}>
                            <Toast show={show2} onHide={handleClose2}>
                              <Toast.Header closeButton={false}>
                                <strong className="me-auto">Alerta!</strong>
                                <small>Ahora</small>
                              </Toast.Header>
                              <Toast.Body>Su articulo se guardo correctamente.</Toast.Body>
                            </Toast>
                          </ToastContainer>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={addNFT}>
                        Guardar cambios
                    </Button>
                    </Modal.Footer>
                </Modal>
              </div>


                <h4 id='text' style={{textAlign: 'center', color: 'white', paddingTop: 20, paddingBottom:10,}}>Mis NFT</h4>
                <Row xs={0.75} md={6} className="justify-content-md-center" style={{marginTop:10,marginLeft:20,marginRight:20}} >
                {NFTs.map((NFT, index) => (
                <Col key={NFT.id ? NFT.id : index}>
                <Card style={{margin:10,}}>
                    <Card.Img variant="top" src={Image2} />
                    <Card.Body>
                    <Card.Text>{NFT.contractadress}</Card.Text>
                    <Card.Text>{NFT.tokenID}</Card.Text>
                    </Card.Body>
                    <Card.Header variant="light"><Button variant='danger' onClick={() => restNFT(NFT.id)}>Eliminar</Button></Card.Header>
                </Card>
                </Col>
                ))}
                </Row>
      

                
               
            </div>
        </div>
        </>
    );
}





export default withAuthenticator(InventarioNFT)