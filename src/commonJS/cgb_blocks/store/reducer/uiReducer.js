/**
 * External dependencies
 */
import {
	isBoolean,
} from 'lodash';

/**
 * Internal dependencies
 */
import { DEFAULT_STATE } 	from '../constants';

export function toggleFullscreen( state = { ui: { ...DEFAULT_STATE.ui } }, action ) {
	const { ui } = state;
	const { isFull } = action;
	const newUi = {
		...ui,
		isFullscreen: isBoolean( isFull ) ? isFull : ! ui.isFullscreen,
	};
	return {
		...state,
		ui: newUi,
	};
}

export function addFullscreenId( state = { ui: { ...DEFAULT_STATE.ui } }, action ) {
	const { ui } = state;
	const { newId } = action;
	const newUi = {
		...ui,
		fullscreenIds: [
			...ui.fullscreenIds,
			newId,
		],
	};
	return {
		...state,
		ui: newUi,
	};
}
