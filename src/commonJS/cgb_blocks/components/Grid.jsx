/**
 * External dependencies
 */
import classNames 		from 'classnames';

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
			blockGroupId,
			className,

			items,								// from items
			moveItem,							// from items
			gridSettings,								// from atts

			// transitionTime,						// from settings
			imageControlsSettings,				// from atts
			imageCaptionSettings,				// from atts
			imageHoverEffect,					// from atts
			imageHoverEffectSettings,			// from atts
			imageHighlightEffect,				// from atts
			imageHighlightEffectSettings,		// from atts
			ItemComponent,

			PlaceholderNoItems,
		} = this.props;

		return <>
			<div className={ classNames( className, 'cgb-block' ) }>

				{ items.length > 0 &&
					<div className="cgb-block-grid">

						<GridGallery
							blockGroupId={ blockGroupId }
							items={ items }
							gridSettings={ gridSettings }
							imageControlsSettings={ imageControlsSettings }
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
					</div>
				}

				{ items.length === 0 && PlaceholderNoItems &&
					<PlaceholderNoItems/>
				}

				{ items.length === 0 && ! PlaceholderNoItems &&
					<div></div>
				}

			</div>
		</>;

	}
}

export default Grid;
