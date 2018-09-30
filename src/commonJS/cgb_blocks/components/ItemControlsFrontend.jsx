
let ItemControlsFrontend = ( {
	index,
	item: {
		id,
		fetched,
		title,
		orientation
	},
} ) => <div className="cgb-block-item-controls cgb-flex-row">
	<div className="cgb-block-item-controls-inner">



	</div>
</div>;

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.ItemControls		= ItemControlsFrontend;

export default ItemControlsFrontend;
