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

class GeneralTabComponent extends React.Component {

	render() {
		const {
			className,
		} = this.props;

		return <div className={ classnames( [ 'general', className ] ) }>

			Nothing here yet ... coming soon

		</div>;

	}
}

export default withTabInfo( GeneralTabComponent, {
	title: __( 'General', 'cgb' ),
} );
