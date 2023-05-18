import React from 'react';
import CardCarrousel from '../components/carouselcard'

import './Anuncios.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@aws-amplify/ui-react/styles.css';



const Anuncios = () => {
    return(
    <>
    <div className='body2'>
    <CardCarrousel></CardCarrousel>
    </div>
    </>
    );
}

export default Anuncios;