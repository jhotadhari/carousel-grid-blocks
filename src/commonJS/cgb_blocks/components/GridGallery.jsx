/**
 * External dependencies
 */
import Gallery from 'react-photo-gallery';
import { SortableContainer } from "react-sortable-hoc";
import { computeSizes, computeSizesColumns } from '../utils';	// from 'react-photo-gallery/src/utils';  // why doesn't that work?

/**
 * Internal dependencies
 */
import GridItem from './GridItem.jsx';

class RawGridGallery extends Gallery {

	render() {
		const containerWidth = this.state.containerWidth;
		// no containerWidth until after first render with refs, skip calculations and render nothing
		if ( !containerWidth ) return <div ref={ c => ( this._gallery = c ) } />;
		const { ImageComponent } = this.props;
		// subtract 1 pixel because the browser may round up a pixel
		const { margin, onClick, direction } = this.props;
		let { columns } = this.props;

		// set default breakpoints if user doesn't specify columns prop
		if ( columns === undefined ) {
			columns = 1;
			if ( containerWidth >= 500 ) columns = 2;
			if ( containerWidth >= 900 ) columns = 3;
			if ( containerWidth >= 1500 ) columns = 4;
		}
		const photos = this.props.photos;

		const _width = containerWidth - 1;
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

		const {
			imageHoverEffect,
			imageHighlightEffect,
			imageHighlightBoxShadowColor,
			imageHighlightBoxShadowWidth,
		} = this.props;

		return (
			<div className="react-photo-gallery--gallery">
				<div ref={ c => ( this._gallery = c ) } style={ galleryStyle }>
					{ thumbs.map( ( photo, index ) => {

						return (
							<ImageComponent
								margin={ margin }
								index={ index }
								sortIndex={ index }
								direction={ direction }
								key={ photo.key }
								photo={ photo }
								imageHoverEffect={ imageHoverEffect }
								imageHighlightEffect={ imageHighlightEffect }
								imageHighlightBoxShadowColor={ imageHighlightBoxShadowColor }
								imageHighlightBoxShadowWidth={ imageHighlightBoxShadowWidth }

							/>
						);
					} ) }
				</div>
			</div>
		);
	}

}

const GridGallery = SortableContainer( ( {
	photos,
	items,
	imageHoverEffect,
	imageHighlightEffect,
	imageHighlightBoxShadowColor,
	imageHighlightBoxShadowWidth,
	columns,
	margin,
} ) => {
	return <RawGridGallery
		photos={ photos }
		items={ items }
		columns={ ! isNaN( columns ) ? parseInt( columns ) : undefined }
		margin={ margin }
		direction={ 'row' }
		ImageComponent={ GridItem }
		imageHoverEffect={ imageHoverEffect }
		imageHighlightEffect={ imageHighlightEffect }
		imageHighlightBoxShadowColor={ imageHighlightBoxShadowColor }
		imageHighlightBoxShadowWidth={ imageHighlightBoxShadowWidth }
	/>;
});


export default GridGallery;
