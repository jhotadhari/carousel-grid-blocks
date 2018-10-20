
const composeWithProps = injectedProps =>
	WrappedComponent => props => <WrappedComponent {...injectedProps} {...props} />;

export default composeWithProps;
