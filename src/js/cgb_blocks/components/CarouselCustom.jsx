/*
 * External dependencies
 */
import { Carousel } from 'react-responsive-carousel';
import Swipe from 'react-easy-swipe';
// import cssClasses from 'react-responsive-carousel/lib/cssClasses';
import CSSTranslate from 'react-responsive-carousel/lib/js/CSSTranslate';
import cssClasses from 'react-responsive-carousel/lib/js/cssClasses';
import classnames from 'classnames';
const { get } = lodash;
import ReactTimeout		from 'react-timeout'

/**
 * Internal dependencies
 */
import ItemCaption				 		from './ItemCaption.jsx';

class CarouselCustom extends Carousel {

	constructor(props) {
		super(props);
	}

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.children && this.props.children && !this.state.initialized) {
            this.setupCarousel();
        }
        if (prevState.swiping && !this.state.swiping) {
            // We stopped swiping, ensure we are heading to the new/current slide and not stuck
            this.resetPosition();
        }

        // fix
        if ( prevProps.width !== this.props.width ) {
        	this.updateSizes();
        }

    }

    renderControls() {
        if ( ! this.props.showIndicators )
            return null

        return (
            <ul className={ "control-dots position-" + this.props.indicatorsPosition } >
				{ React.Children.map( this.props.children, ( item, index ) => {
					return <li
						className={ cssClasses.DOT( index === this.state.selectedItem ) }
						onClick={ this.changeItem }
						value={ index }
						key={index}
					/>;
				})}
            </ul>
		);
    }

    renderItems() {
        return React.Children.map( this.props.children, (item, index) => {
            const itemClass = cssClasses.ITEM(true, index === this.state.selectedItem);
            const slideProps = {
                ref: (e) => this.setItemsRef(e, index),
                key: 'itemKey' + index,
                className: cssClasses.ITEM(true, index === this.state.selectedItem),
                onClick: this.handleClickItem.bind(this, index, item)
            };

            if (this.props.centerMode && this.props.axis === 'horizontal') {
                slideProps.style = {
                    minWidth: this.props.centerSlidePercentage + '%'
                };
            }

            if ( 'fade' === this.props.animation ) {
            	slideProps.style = {
            		...slideProps.style,
            		position: 'absolute',
            		opacity: index === this.state.selectedItem ? 1 : 0,
            		zIndex: index === this.state.selectedItem ? 1 : 0,

					transition: 'opacity ' + ( this.props.transitionTime / 1000 ) + 's',
            	};
            }

            return (
                <li {...slideProps}>
                    { item }
                </li>
            );
        });
    }

    getPosition (index, props) {
        if (props.infiniteLoop) {
            // index has to be added by 1 because of the first cloned slide
            ++index;
        }

        if (index === 0) {
            return 0;
        }

        const childrenLength = React.Children.count(props.children);
        if (props.centerMode && props.axis === 'horizontal') {
            let currentPosition = -index * props.centerSlidePercentage;
            const lastPosition = childrenLength - 1;

            if (index && (index !== lastPosition || props.infiniteLoop)) {
                currentPosition += (100 - props.centerSlidePercentage) / 2;
            } else if (index === lastPosition) {
                currentPosition += 100 - props.centerSlidePercentage;
            }

            return currentPosition;
        }

        return -index * 100;
    };

    render() {
        if (!this.props.children || React.Children.count(this.props.children) === 0) {
            return null;
        }

        const itemsLength = React.Children.count(this.props.children);

        const isHorizontal = this.props.axis === 'horizontal';

        const canShowArrows = this.props.showArrows && itemsLength > 1;

        // show left arrow?
        const hasPrev = canShowArrows && (this.state.selectedItem > 0 || this.props.infiniteLoop);
        // show right arrow
        const hasNext = canShowArrows && (this.state.selectedItem < itemsLength - 1 || this.props.infiniteLoop);
        // obj to hold the transformations and styles
        let itemListStyles = {};

        switch( this.props.animation ){
			case 'fade':
				itemListStyles = {};
				break;
			case 'slide':
				const currentPosition = this.getPosition(this.state.selectedItem, this.props);

                console.log( 'debug currentPosition', currentPosition ); // debug
				// if 3d is available, let's take advantage of the performance of transform
				const transformProp = CSSTranslate(currentPosition + '%', this.props.axis);
				const transitionTime = this.props.transitionTime + 'ms';
				itemListStyles = {
							'WebkitTransform': transformProp,
							   'MozTransform': transformProp,
								'MsTransform': transformProp,
								 'OTransform': transformProp,
								  'transform': transformProp,
								'msTransform': transformProp
				};
				if ( ! this.state.swiping ) {
					itemListStyles = {
						...itemListStyles,
					   'WebkitTransitionDuration': transitionTime,
						  'MozTransitionDuration': transitionTime,
						   'MsTransitionDuration': transitionTime,
							'OTransitionDuration': transitionTime,
							 'transitionDuration': transitionTime,
						   'msTransitionDuration': transitionTime
					}
				}
				break;
        }

        let swiperProps = {
            selectedItem: this.state.selectedItem,
            className: cssClasses.SLIDER(true, this.state.swiping),
            onSwipeMove: this.onSwipeMove,
            onSwipeStart: this.onSwipeStart,
            onSwipeEnd: this.onSwipeEnd,
            style: itemListStyles,
            tolerance: this.props.swipeScrollTolerance
        };

        const containerStyles = {};

        if (isHorizontal) {
            swiperProps.onSwipeLeft = this.increment;
            swiperProps.onSwipeRight = this.decrement;

            if ( this.props.height ) {
                swiperProps.style.height = this.props.height;
                containerStyles.height = this.props.height;
            } else if ( this.props.dynamicHeight ) {




                // const itemHeight = this.getVariableImageHeight(this.state.selectedItem);
                const itemHeight = null;

                // // fix, item doesn't show up. force rerender
                // if ( null === itemHeight ){
                // 	this.props.setTimeout( () => this.setState( { rerender: Math.random() } ), 1500 );
                // }

                swiperProps.style.height = itemHeight || this.state.itemSize;
                containerStyles.height = itemHeight || this.state.itemSize;






            }

        } else {
            swiperProps.onSwipeUp = this.props.verticalSwipe === 'natural' ? this.increment : this.decrement;
            swiperProps.onSwipeDown = this.props.verticalSwipe === 'natural' ? this.decrement : this.increment;
            swiperProps.style.height = this.state.itemSize;
            containerStyles.height = this.state.itemSize;
        }

        return (
            <div className={ classnames( [this.props.className] )} ref={this.setCarouselWrapperRef}>
                <div className={ classnames( [
                	...( get( this.props.imageControlsSettings, ['imgOnClickFullscreen'] ) ? ['is-clickable'] : [] ),
                	cssClasses.CAROUSEL(true)
                ] ) } style={ {
                	width: this.props.width,
                	...( this.props.imageFit && 'center' !== this.props.innerAlign && { float: this.props.innerAlign, } ),
                } }>
                    { 'insideImage' === this.props.arrowsPosition && <button type="button" className={cssClasses.ARROW_PREV(!hasPrev)} onClick={this.decrement} /> }
                    <div className={cssClasses.WRAPPER(true, this.props.axis)} style={containerStyles} ref={this.setItemsWrapperRef}>
                        { this.props.swipeable ?
                            <Swipe
                                tagName="ul"
                                ref={this.setListRef}
                                {...swiperProps}
                                allowMouseEvents={this.props.emulateTouch}>
                              { this.renderItems() }
                            </Swipe> :
                            <ul
                                className={cssClasses.SLIDER(true, this.state.swiping)}
                                style={ itemListStyles }
							>
                                { this.renderItems() }
                            </ul>
                        }
                    </div>
                    { 'insideImage' === this.props.arrowsPosition && <button type="button" className={cssClasses.ARROW_NEXT(!hasNext)} onClick={this.increment} /> }

                    { 'bottom' === this.props.indicatorsPosition && this.renderControls() }
                    { this.renderStatus() }
                </div>

                { this.props.imageFit && 'center' !== this.props.innerAlign &&
                	<div className={ 'cgb-clearfix' }></div>
                }

                { 'hide' !== this.props.imageCaptionSettings.show && 'below' === this.props.imageCaptionSettings.position &&
                	<div className={ 'carousel carousel-caption' }>
						<ItemCaption
							imageCaptionSettings={ this.props.imageCaptionSettings }
							className={ 'cgb-block-carousel-item-info' }
							item={ this.props.items[this.props.selectedItem] }
						/>
                	</div>
                }

				<div className={ 'carousel carousel-controls' }>
					{ 'below' === this.props.arrowsPosition && <button type="button" className={cssClasses.ARROW_PREV(!hasPrev)} onClick={this.decrement} /> }
					{ 'below' === this.props.indicatorsPosition && this.renderControls() }
					{ 'below' === this.props.arrowsPosition && <button type="button" className={cssClasses.ARROW_NEXT(!hasNext)} onClick={this.increment} /> }
				</div>

				{ this.renderThumbs() }

            </div>
        );

    }
}

export default ReactTimeout( CarouselCustom );
