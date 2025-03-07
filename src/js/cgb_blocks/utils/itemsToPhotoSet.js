
const itemsToPhotoSet = ( items ) => items ? [...items].map( item => {
	return {
		src: item.src,
		width: item.width,
		height: item.height,
		key: item.key,
	}
} ) : [];

export default itemsToPhotoSet;
