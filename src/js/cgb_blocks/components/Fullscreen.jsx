/**
 * External dependencies
 */
import Fullscreen from 'react-full-screen';
const shortid = require('shortid');

class _Fullscreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: shortid.generate(),
		};
	}

	componentDidMount() {
		const { addFullscreenId } = this.props;
		const { id } = this.state;
		addFullscreenId( id );
	}

	componentWillUnmount() {
		const { removeFullscreenId } = this.props;
		const { id } = this.state;
		removeFullscreenId( id );
	}

	render() {
		const { id } = this.state;
		const {
			activeFullscreenId,
			isFullscreen,
			toggleFullscreen,
			Carousel,
			carouselSettings,
			imageHoverEffect,
			imageHoverEffectSettings,
			imageControlsSettings,
			imageCaptionSettings,
		} = this.props;

		return ( <>
			{ id === activeFullscreenId &&
				<Fullscreen
					enabled={ isFullscreen }
					onChange={ isFull => toggleFullscreen( isFull ) }
				>
					{ isFullscreen && <>

						<div
							className={ 'fullscreen-close' }
							onClick={ e => toggleFullscreen( false ) }
						></div>

						<Carousel
							carouselSettings={ carouselSettings }
							imageHoverEffect={ imageHoverEffect }
							imageHoverEffectSettings={ imageHoverEffectSettings }
							imageControlsSettings={ imageControlsSettings }
							imageCaptionSettings={ imageCaptionSettings }
						/>
					</> }
				</Fullscreen>
			}
		</> );
	}

}

export default _Fullscreen;
