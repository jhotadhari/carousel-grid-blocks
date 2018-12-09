/*
 * External dependencies
 */
import { Carousel } from 'react-responsive-carousel';
import Swipe from 'react-easy-swipe';
import klass from 'react-responsive-carousel/lib/cssClasses';
import CSSTranslate from 'react-responsive-carousel/lib/CSSTranslate';

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
						className={ klass.DOT( index === this.state.selectedItem ) }
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
            const itemClass = klass.ITEM(true, index === this.state.selectedItem);
            const slideProps = {
                ref: (e) => this.setItemsRef(e, index),
                key: 'itemKey' + index,
                className: klass.ITEM(true, index === this.state.selectedItem),
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
				const currentPosition = this.getPosition(this.state.selectedItem);
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
            className: klass.SLIDER(true, this.state.swiping),
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
                const itemHeight = this.getVariableImageHeight(this.state.selectedItem);
                swiperProps.style.height = itemHeight || 'auto';
                containerStyles.height = itemHeight || 'auto';
            }

        } else {
            swiperProps.onSwipeUp = this.props.verticalSwipe === 'natural' ? this.increment : this.decrement;
            swiperProps.onSwipeDown = this.props.verticalSwipe === 'natural' ? this.decrement : this.increment;
            swiperProps.style.height = this.state.itemSize;
            containerStyles.height = this.state.itemSize;
        }

        return (
            <div className={this.props.className} ref={this.setCarouselWrapperRef}>
                <div className={klass.CAROUSEL(true)} style={{width: this.props.width}}>
                    { 'insideImage' === this.props.arrowsPosition && <button type="button" className={klass.ARROW_PREV(!hasPrev)} onClick={this.decrement} /> }
                    <div className={klass.WRAPPER(true, this.props.axis)} style={containerStyles} ref={this.setItemsWrapperRef}>
                        { this.props.swipeable ?
                            <Swipe
                                tagName="ul"
                                ref={this.setListRef}
                                {...swiperProps}
                                allowMouseEvents={this.props.emulateTouch}>
                              { this.renderItems() }
                              { console.log( 'debug', swiperProps ) }
                            </Swipe> :
                            <ul
                                className={klass.SLIDER(true, this.state.swiping)}
                                style={ itemListStyles }
							>
                                { this.renderItems() }
                            </ul>
                        }
                    </div>
                    { 'insideImage' === this.props.arrowsPosition && <button type="button" className={klass.ARROW_NEXT(!hasNext)} onClick={this.increment} /> }

                    { 'bottom' === this.props.indicatorsPosition && this.renderControls() }
                    { this.renderStatus() }
                </div>

                { 'hide' !== this.props.imageCaptionSettings.show && 'below' === this.props.imageCaptionSettings.position &&
                	<div className={ 'carousel' }>
						<ItemCaption
							imageCaptionSettings={ this.props.imageCaptionSettings }
							className={ 'cgb-block-carousel-item-info' }
							item={ this.props.items[this.props.selectedItem] }
						/>
                	</div>
                }

				<div className={ 'carousel carousel-controls' }>
					{ 'below' === this.props.arrowsPosition && <button type="button" className={klass.ARROW_PREV(!hasPrev)} onClick={this.decrement} /> }
					{ 'below' === this.props.indicatorsPosition && this.renderControls() }
					{ 'below' === this.props.arrowsPosition && <button type="button" className={klass.ARROW_NEXT(!hasNext)} onClick={this.increment} /> }
				</div>

				{ this.renderThumbs() }

            </div>
        );

    }
}

export default CarouselCustom;
