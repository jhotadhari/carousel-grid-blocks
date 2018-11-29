import { Carousel } from 'react-responsive-carousel';
import Swipe from 'react-easy-swipe';

import klass from 'react-responsive-carousel/lib/cssClasses';
import CSSTranslate from 'react-responsive-carousel/lib/CSSTranslate';


class CarouselCustom extends Carousel {

	constructor(props) {
		super(props);
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

        if (!this.state.swiping) {
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

            if (this.props.dynamicHeight) {
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
                            </Swipe> :
                            <ul
                                className={klass.SLIDER(true, this.state.swiping)}
                                style={itemListStyles}>
                                { this.renderItems() }
                            </ul>
                        }
                    </div>
                    { 'insideImage' === this.props.arrowsPosition && <button type="button" className={klass.ARROW_NEXT(!hasNext)} onClick={this.increment} /> }

                    { 'bottom' === this.props.indicatorsPosition && this.renderControls() }
                    { this.renderStatus() }
                </div>


				<div className={ 'carousel carousel-controls' } style={{width: this.props.width}}>
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
