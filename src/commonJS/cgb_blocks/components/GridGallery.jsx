/**
 * External dependencies
 */
import {
	get,
} from 'lodash';
import Gallery from 'react-photo-gallery';
import { SortableContainer } from 'react-sortable-hoc';
import { computeSizes, computeSizesColumns } from '../../vendor/react-photo-gallery/utils';	// from 'react-photo-gallery/src/utils';  // why doesn't that work?

/**
 * Internal dependencies
 */
import itemsToPhotoSet 	from '../utils/itemsToPhotoSet';
import GridItem 		from './GridItem.jsx';

class RawGridGallery extends Gallery {

	render() {
		const containerWidth = this.state.containerWidth;
		// no containerWidth until after first render with refs, skip calculations and render nothing
		if ( ! containerWidth )
			return <div ref={ c => ( this._gallery = c ) } />;

		const {
			ImageComponent,
			onClick,
			direction,
			gridSettings,
			imageControlsSettings,
			imageCaptionSettings,
			imageHoverEffect,
			imageHoverEffectSettings,
			imageHighlightEffect,
			imageHighlightEffectSettings,
			ItemComponent,
		} = this.props;

		let {
			columns,
			margin,
		} = this.props;

		// set default breakpoints if user doesn't specify columns prop
		if ( columns === undefined ) {
			columns = 1;
			if ( containerWidth >= 500 ) columns = 2;
			if ( containerWidth >= 900 ) columns = 3;
			if ( containerWidth >= 1500 ) columns = 4;
		}
		const photos = this.props.photos;

		const _width = containerWidth - 1;	// subtract 1 pixel because the browser may round up a pixel
		let galleryStyle, thumbs;
		if ( direction === 'row' ) {
			galleryStyle = { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' };
			thumbs = computeSizes( { width: _width, columns, margin, photos } );
		}
		if ( direction === 'column' ) {
			galleryStyle = { position: 'relative' };
			thumbs = computeSizesColumns( { width: _width, columns, margin, photos } );
			galleryStyle.height = thumbs[thumbs.length - 1].containerHeight;
		}

		return (
			<div className="react-photo-gallery--gallery">
				<div ref={ c => ( this._gallery = c ) } style={ galleryStyle }>
					{ thumbs.map( ( photo, index ) => {
						return (
							<ImageComponent
								containerWidth={ containerWidth }
								columns={ columns }
								margin={ margin }
								index={ index }
								sortIndex={ index }
								direction={ direction }
								key={ photo.key }
								photo={ photo }
								gridSettings={ gridSettings }
								imageControlsSettings={ imageControlsSettings }
								imageCaptionSettings={ imageCaptionSettings }
								imageHoverEffect={ imageHoverEffect }
								imageHoverEffectSettings={ imageHoverEffectSettings }
								imageHighlightEffect={ imageHighlightEffect }
								imageHighlightEffectSettings={ imageHighlightEffectSettings }
								ItemComponent={ ItemComponent }
							/>
						);
					} ) }
				</div>
			</div>
		);
	}

}

const GridGallery = SortableContainer( ( {
	items,
	imageControlsSettings,
	imageCaptionSettings,
	imageHoverEffect,
	imageHighlightEffect,
	imageHighlightEffectSettings,
	gridSettings,
	ItemComponent,
} ) => {

	let { columns, margin } = gridSettings;

	return <RawGridGallery
		photos={ itemsToPhotoSet( items ) }
		items={ items }
		columns={ undefined === columns || isNaN( columns ) ? undefined : parseInt( columns ) }
		margin={ parseInt( margin ) }
		direction={ 'row' }
		gridSettings={ gridSettings }
		ImageComponent={ GridItem }
		imageControlsSettings={ imageControlsSettings }
		imageCaptionSettings={ imageCaptionSettings }
		imageHoverEffect={ imageHoverEffect }
		imageHighlightEffect={ imageHighlightEffect }
		imageHighlightEffectSettings={ imageHighlightEffectSettings }
		ItemComponent={ ItemComponent }
	/>;
});


export default GridGallery;
