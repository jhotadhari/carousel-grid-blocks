/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	filter,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	decodeEntities,
} = wp.htmlEntities;

/**
 * Internal dependencies
 */
import rgbaToCssProp					from '../utils/rgbaToCssProp';

let ItemCaption = ( {
	imageCaptionSettings,
	className,
	item,
} ) => {

	const {
		title,
		caption,
		postTitle,
		postExcerpt,
	} = item;

	const {
		margin,
		padding,
		cutomBackgroundColor,
		backgroundColor,
		customColor,
		color,
		position,
	} = imageCaptionSettings;

	let captionIsVisible = false;
	switch( imageCaptionSettings.show ){
		case 'show':
			captionIsVisible = true;
			break
		case 'hide':
			captionIsVisible = false;
			break
		case 'showOnhover':
			captionIsVisible = 'showOnhover';
			break
		case 'showIfSelected':
			captionIsVisible = item.selected;
			break
	};

	const style = {
		// type imageCaption
		width: 'calc( 100% - ' + ( margin.match(/\d+/g) * 2 ) + margin.match(/\D+/g) + ' )',
		margin: 'below' === position ? margin + ' auto' : 'auto ' + margin,
		...( 'below' === position && { position: 'relative' } ),

		// for all types. same as imageControls
		padding: padding,

		...( cutomBackgroundColor && { background: rgbaToCssProp( backgroundColor ) } ),
		...( customColor && { color: color } ),

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

	const CaptionPart = ( { partKey } ) => {
		switch( partKey ){
			case 'title':
				return  <div
						className={ className + '-title' }
					>{ decodeEntities( title ) }</div>;
			case 'caption':
				return  <div
						dangerouslySetInnerHTML={ { __html: caption } }
						className={ className + '-caption' }
					></div>;
			case 'postTitle':
				return  <div
						dangerouslySetInnerHTML={ { __html: postTitle } }
						className={ className + '-post-title' }
					></div>;
			case 'postExcerpt':
				return  <div
						dangerouslySetInnerHTML={ { __html: postExcerpt } }
						className={ className + '-excerpt' }
					></div>;
		}
		return <span>{ '' }</span>;
	};

	return <div
		className={ [
			className,
			captionIsVisible === true ? 'is-visible' : 'is-hidden',
			captionIsVisible === 'showOnhover' ? 'is-visible-on-hover' : null,
		].filter( a => a !== null ).join(' ') }
		style={ style }
	>
		{ [...imageCaptionSettings.parts].map( part =>
			<CaptionPart
				key={ part }
				partKey={ part }
			/>
		) }
	</div>;
};

export default ItemCaption;
