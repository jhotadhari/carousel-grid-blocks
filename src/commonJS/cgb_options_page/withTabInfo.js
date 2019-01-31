const withTabInfo = ( component, tabInfo ) => {
	component.tabInfo = tabInfo;
	return component;
};

export default withTabInfo;