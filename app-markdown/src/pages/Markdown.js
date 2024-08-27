import React from 'react';
// import { useSelector } from 'react-redux';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function Markdown() {

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>Markdown - Visualisation</title>
                </Helmet>
                <h1>Hello Wolrd !</h1>
            </div>
        </HelmetProvider>
    )
}

export default Markdown;