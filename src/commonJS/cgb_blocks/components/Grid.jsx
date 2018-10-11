
import GridGallery from './GridGallery.jsx';

class Grid extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			items,								// from items
			moveItem,							// from items
			photoSet,							// from items
			columns,							// from atts
			margin,								// from atts
			transitionTime,						// from settings
			imageHoverEffect,					// from atts
			imageHighlightEffect,				// from atts
			imageHighlightBoxShadowColor,		// from atts
			imageHighlightBoxShadowWidth,		// from atts
			ItemComponent,		// from atts
		} = this.props;

		return ([
			<div>

				{ items.length &&
					<GridGallery
						photos={ photoSet }
						items={ items }
						imageHoverEffect={ imageHoverEffect }
						imageHighlightEffect={ imageHighlightEffect }
						imageHighlightBoxShadowColor={ imageHighlightBoxShadowColor }
						imageHighlightBoxShadowWidth={ imageHighlightBoxShadowWidth }
						columns={ columns }
						margin={ margin }
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
