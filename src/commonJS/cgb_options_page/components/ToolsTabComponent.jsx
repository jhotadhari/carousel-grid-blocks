/**
 * External dependencies
 */
import classnames 		from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import withTabInfo	from '../withTabInfo'
import CleanupMediaComponent	from './CleanupMediaComponent.jsx';

class ToolsTabComponent extends React.Component {

	render() {
		const {
			className,
		} = this.props;

		return <div className={ classnames( [ 'tools', className ] ) }>

			<CleanupMediaComponent/>

		</div>;

	}
}

export default withTabInfo( ToolsTabComponent, {
	title: __( 'Tools', 'cgb' ),
} );
