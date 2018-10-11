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


export default ItemControlsFrontend;
