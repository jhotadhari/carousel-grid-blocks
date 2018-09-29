/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
} = wp.components;

/**
 * Internal dependencies
 */
import Inspector 							from './Inspector.jsx';

class GridInspector extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const {
			setAttributes,
			itemWidth,
		} = this.props;

		return ([

			<Inspector/>,

			<PanelBody
				title={'Grid settings'}
				initialOpen={ true }
			>
				<TextControl
					label={ 'Item Width' }
					value={ itemWidth }
					type={ 'number' }
					onChange={ ( newWidth ) => setAttributes( { itemWidth: newWidth } ) }
				/>
			</PanelBody>,



		])
	}
}

export default GridInspector;
