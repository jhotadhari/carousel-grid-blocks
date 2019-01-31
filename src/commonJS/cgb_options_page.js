/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerCoreBlocks } = wp.blockLibrary;

/**
 * Internal dependencies
 */
import OptionsPageComponent 			from './cgb_options_page/components/OptionsPageComponent.jsx';

document.addEventListener('DOMContentLoaded', () => {

	const els = document.getElementsByClassName( 'cgb-options-page' );
	if ( els.length === 0 )
		return;

	[...els].map( ( el, index ) => {
		ReactDOM.render( <OptionsPageComponent/>, el );
	} );

} );