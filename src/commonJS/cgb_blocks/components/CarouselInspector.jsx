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
import composeWithItems 					from '../store/composeWithItems.js';
// import composeWithSettings 				from '../store/composeWithSettings.js';


class CarouselInspector extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		// const {
		// 	// ???
		// } = this.props;

		return ([

			<Inspector/>,

			<PanelBody
				title={'Carousel settings'}
				initialOpen={ true }
			>
				<TextControl
					label={ 'nothing to control ???' }
					value={ '???' }
					onChange={ ( newVal ) => console.log( 'newVal', newVal ) }
				/>
			</PanelBody>,

		])
	}
}

export default CarouselInspector;

// export default composeWithSettings( CarouselInspector, [
// 	// 'transitionTime',
// ] );
