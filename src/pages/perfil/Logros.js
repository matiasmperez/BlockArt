import React, { useEffect } from 'react';
import './Logros.css';

import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from '../../aws-exports';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Logros = () => {
    return(
        <>
        <div className='marketplacebody'>
        <div className='contenedor'>
        <div className='contenedortab' id='contenedortab'>
        <h1 id='texto' style={{textAlign: 'center', color: 'white', paddingTop: 20, paddingBottom:10,}}>Logros</h1>
        
        </div>
        </div>
    </div>
</>
    );
}

export default Logros;