import React, { useEffect } from 'react';
import './Informacion.css';

import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from '../../aws-exports';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Informacion = ({user}) => {

    Amplify.configure(awsconfig);

    const variableusername = (user.username)
    const variableemail = (user.attributes.email)

    useEffect(() => {
        traerDatos()
    }, [])

    function traerDatos(){
        document.getElementById('controlname').value = variableusername
        document.getElementById('controlemail').value =  variableemail
    }

    async function deleteUser() {
        try {
          const result = await Auth.deleteUser();
          console.log(result);
        } catch (error) {
          console.log('Error deleting user', error);
        }
      }


    return(
    <>
        <div className='marketplacebody'>
            <div className='contenedor'>
            <div className='contenedortab' id='contenedortab'>
            <h1 id='texto' style={{textAlign: 'center', color: 'white', paddingTop: 20, paddingBottom:10,}}>Informacion</h1>
            <Form style={{margin:40,}}>
            <Form.Group className="mb-3" >
                <Form.Label style={{textAlign: 'center', color: 'white', paddingTop: 20, paddingBottom:10,fontSize:28}}>Nombre de Usuario</Form.Label>
                <Form.Control type="username" placeholder="Username" readOnly={true} style={{textAlign: 'center'}} id='controlname'/>
                <Form.Text className="text-muted" style={{textAlign: 'center', color: 'white',}}>
                Este es el identificador unico de cada usuario.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label style={{textAlign: 'center', color: 'white', paddingTop: 20, paddingBottom:10,fontSize:28}}>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" readOnly={true} style={{textAlign: 'center'}} id='controlemail'/>
                <Form.Text className="text-muted" style={{textAlign: 'center', color: 'white',}}>
                Su email esta.... VERIFICADO
                </Form.Text>
            </Form.Group>
            </Form>
            </div>
            </div>
        </div>
    </>
    );
}

export default withAuthenticator(Informacion)