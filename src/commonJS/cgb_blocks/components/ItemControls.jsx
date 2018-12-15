/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	filter,
	get,
} from 'lodash';


/**
 * WordPress dependencies
 */
const {
	__,
} = wp.i18n;
const {
	decodeEntities,
} = wp.htmlEntities;

/**
 * Internal dependencies
 */
import rgbaToCssProp					from '../utils/rgbaToCssProp';

let ItemControls = ( {
	imageControlsSettings,
	className,
	item,
	toggleFullscreen,
	getIndexByKey,
	setSelected,
} ) => {

	const {
		postTitle,
		src,
		title,
		postLink,
		key,
	} = item;

	const {
		margin,
		padding,
		backgroundColor,
		color,
		position,
	} = imageControlsSettings;


	let controlsAreVisible = false;
	switch( imageControlsSettings.show ){
		case 'show':
			controlsAreVisible = true;
			break
		case 'hide':
			controlsAreVisible = false;
			break
		case 'showOnhover':
			controlsAreVisible = 'showOnhover';
			break
		case 'showIfSelected':
			controlsAreVisible = item.selected;
			break
	};

	const style = {
		// type imageControls
		width:'auto',
		margin:'auto',
		left:'50%',
		transform:'translate(-50%, -50%)',

		// for all types. same as imageCaption
		padding: padding,
		background: rgbaToCssProp( backgroundColor ),
		color: color,
		transition: 'opacity 0.35s',
		...( 'bottom' === position && { bottom: margin } ),
		...( 'top' === position && { top: margin } ),
		...( 'top' === position && { display: 'table' } ),
		...( 'center' === position && {
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			margin: 'auto',
			display: 'table',
		} ),
		...( 'full' === position && {
			top: '0',
			left: '0',
			margin: '0',
			width: '100%',
			height: '100%',
		} ),
	};


	const ImageControl = ( { control, style } ) => {
		switch( control ){
			case 'link':
				let linkUrl, linkTitle;
				switch( get( imageControlsSettings, ['linkControlSettings', 'linkTo'] ) ) {
					case 'post':
						linkUrl = postLink || src;
						linkTitle = decodeEntities( postTitle || title );
						break;
					case 'attachment':
						linkUrl = src;
						linkTitle = title;
						break;
				}
				return  <div style={ style } className={ className + '-control' } >
						<a
							href={ linkUrl }
							title={ linkTitle }
							target={ get( imageControlsSettings, ['linkControlSettings', 'newTab'] ) ? '_blank' : '_self' }
						>

							<button
								className={ 'components-icon-button' }
								aria-label={ linkTitle }
								title={ linkTitle }
							>
								<span className={ [ 'dashicons', 'dashicons-redo' ].join( ' ' ) }></span>
							</button>

						</a>
					</div>;
			case 'fullscreen':
				return  <div style={ style } className={ className + '-control' } >

						<button
							className={ 'components-icon-button' }
							aria-label={ 	__( 'Fullscreen', 'cgb' ) }
							title={ 		__( 'Fullscreen', 'cgb' ) }
							onClick={ () => {
								setSelected( getIndexByKey( key ) );
								toggleFullscreen();
							} }
						>
							<span className={ [ 'dashicons', 'dashicons-editor-expand' ].join( ' ' ) }></span>
						</button>

					</div>;
		}
		return <span>{ '' }</span>;
	};


	return <div
		className={ [
			className,
			controlsAreVisible === true ? 'is-visible' : 'is-hidden',
			controlsAreVisible === 'showOnhover' ? 'is-visible-on-hover' : null,
		].filter( a => a !== null ).join(' ') }
		style={ style }
	>
		<div className={ className + '-inner' } >
			{ [...imageControlsSettings.controls].map( control =>
				<ImageControl
					style={ {
						display: controlsAreVisible ? 'block' : 'none',
					} }
					key={ control }
					control={ control }
				/>
			) }
		</div>
	</div>
};





export default ItemControls;
