/**
 * Internal dependencies
 */
import GridGallery from './GridGallery.jsx';

class Grid extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			items,								// from items
			moveItem,							// from items
			gridSettings,								// from atts

			// transitionTime,						// from settings
			imageCaptionSettings,				// from atts
			imageHoverEffect,					// from atts
			imageHoverEffectSettings,			// from atts
			imageHighlightEffect,				// from atts
			imageHighlightEffectSettings,		// from atts
			ItemComponent,						// from atts
		} = this.props;

		return ([
			<div>

				{ items.length &&
					<GridGallery
						items={ items }
						gridSettings={ gridSettings }
						imageCaptionSettings={ imageCaptionSettings }
						imageHoverEffect={ imageHoverEffect }
						imageHoverEffectSettings={ imageHoverEffectSettings }
						imageHighlightEffect={ imageHighlightEffect }
						imageHighlightEffectSettings={ imageHighlightEffectSettings }


						axis={ 'xy' }
						useDragHandle={ true }
						onSortEnd={ ( { oldIndex, newIndex } ) => {
							moveItem( oldIndex, newIndex )
						} }
						ItemComponent={ ItemComponent }
					/>
				}

			</div>
		]);

	}
}

export default Grid;
