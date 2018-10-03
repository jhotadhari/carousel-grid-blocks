const { __ } = wp.i18n;
const {
    IconButton,
} = wp.components;

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

		<IconButton
			icon="editor-expand"
			onClick={ () => console.log( 'fullscreen' ) }
		/>

	</div>

</div>;

cgbBlocks.components = undefined !== cgbBlocks.components ? cgbBlocks.components : {};
cgbBlocks.components.ItemControls		= ItemControlsFrontend;

export default ItemControlsFrontend;
