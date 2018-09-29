
/**
 * WordPress dependencies
 */
const {
    IconButton,
} = wp.components;

/**
 * Internal dependencies
 */
import composeWithItems 				from '../store/composeWithItems.js';

class Toolbar extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const {
			addItem,
		} = this.props;

		return ([

			<IconButton
				title={ 'Add Item' }
				className={ 'components-toolbar__control' }
				icon={ 'plus' }
				onClick={ addItem }
			/>

		]);
	}
}

export default composeWithItems( Toolbar, [
	'addItem',
] );
