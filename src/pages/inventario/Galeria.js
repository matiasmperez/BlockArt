import React, { useEffect, useState } from 'react';
import {API, graphqlOperation} from 'aws-amplify'
import { createGaleria } from '../../graphql/mutations'
import { listGalerias} from '../../graphql/queries'
import * as mutations from '../../graphql/mutations';
import { withAuthenticator } from '@aws-amplify/ui-react';

import './Galeria.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@aws-amplify/ui-react/styles.css';

import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';


import Image1 from '../../assets/globales/1.webp'
import Image2 from '../../assets/galerias/2.jpeg'


import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
Amplify.configure(awsExports);




const Galeria = ({user}) => {

    const variable = (user.username)
    const initialState = { usuario:variable, visitas:'0', precio:'0',tipo:'0'}

  const [formState, setFormState] = useState(initialState)
  const [Galerias, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
    VerificarCantidad()
  }, [])

  async function VerificarCantidad(){
    try {
    const todoData = await API.graphql(graphqlOperation(listGalerias,{filter: {usuario: {eq: user.username}}}))
    const Galerias = todoData.data.listGalerias.items
    if(Galerias.length === 1){
      document.getElementById('contenedortab').style.display = 'none'
    }
    if(Galerias.length === 0){
      document.getElementById('text').style.display = 'none'
    }
    }
    catch (err) { console.log('error') }
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listGalerias,{filter: {usuario: {eq: user.username}}}))
      const Galerias = todoData.data.listGalerias.items
      setTodos(Galerias)
    } catch (err) { console.log('error fetching Galerias') }
  }

  async function addGaleria() {
    try {
      handleShow2()
      const Galeria = { ...formState }
      setTodos([...Galerias, Galeria])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createGaleria, {input: Galeria}))
      handleClose()
      window.location.reload();
      
    } catch (err) {
      console.log('error creating Galeria:', err)
    }
  }

  async function restGaleria(ido) {
    try {
      const todoGaleria = {
        id: ido,
      };
      await API.graphql({ query: mutations.deleteGaleria, variables: {input: todoGaleria}});
      window.location.reload();
    } catch (err) {
      console.log('error delete Galeria:', err)
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
            <h2 className='titulo'>Galerias</h2>
            <div className='contenedor'>
            <div className='contenedortab' id='contenedortab'>
            <h4 id='texto' style={{textAlign: 'center', color: 'white', paddingTop: 20, paddingBottom:10,}}>Reclamar mi galeria</h4>
            <Row xs={0.75} md={5} className="justify-content-md-center" style={{marginTop:10,marginLeft:20,marginRight:20}} >
            {Array.from({ length: 1 }).map((_, idx) => (
                <Col key={idx}>
                <Card style={{margin:10,}}>
                    <Card.Img variant="top" src={Image1} />
                    <Card.Header variant="light"><Button variant='dark' onClick={handleShow}>Obtener mi galeria gratuita</Button></Card.Header>
                </Card>
                </Col>
                 ))}
                 </Row>
                     <Modal show={show} onHide={handleClose}>
                         <Modal.Header closeButton>
                         <Modal.Title>Comprar</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>¿Esta seguro que desea reclamar su galeria?
                               <ToastContainer className="p-3" position="middle-center" show={show2} onHide={handleClose2}>
                                 <Toast show={show2} onHide={handleClose2}>
                                   <Toast.Header closeButton={false}>
                                     <strong className="me-auto">Alerta!</strong>
                                     <small>Ahora</small>
                                   </Toast.Header>
                                   <Toast.Body>Su galeria se reclamo correctamente.</Toast.Body>
                                 </Toast>
                               </ToastContainer>
                         </Modal.Body>
                         <Modal.Footer>
                         <Button variant="danger" onClick={handleClose}>
                             Cancelar
                         </Button>
                         <Button variant="success" onClick={addGaleria}>
                             Guardar cambios
                         </Button>
                         </Modal.Footer>
                     </Modal>
                   </div>
     
     
                     <h4 id='text' style={{textAlign: 'center', color: 'white', paddingTop: 20, paddingBottom:10,}}>Mis Galerias</h4>
                     <Row xs={0.75} md={2} className="justify-content-md-center" style={{marginTop:10,marginLeft:20,marginRight:20}} >
                     {Galerias.map((Galeria, index) => (
                     <Col key={Galeria.id ? Galeria.id : index}>
                     <Card style={{margin:10,}}>
                         <Card.Img variant="top" src={Image2} />
                         <Card.Body>
                         <Card.Text>Cantidad de visitas: {Galeria.visitas}</Card.Text>
                         </Card.Body>
                         <Card.Header variant="light"><Button variant='danger' onClick={() => restGaleria(Galeria.id)}>Eliminar</Button></Card.Header>
                     </Card>
                     </Col>
                     ))}
                     </Row>
           
     
                     
                    
                 </div>
             </div>
             </>
         );
}

export default withAuthenticator(Galeria);