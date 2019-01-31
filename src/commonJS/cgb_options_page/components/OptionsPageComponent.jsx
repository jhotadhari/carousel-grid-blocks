/**
 * External dependencies
 */
import {
	Tab,
	Tabs,
	TabList,
	TabPanel ,
} from 'react-tabs';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import GeneralTabComponent			from './GeneralTabComponent.jsx';
import ToolsTabComponent			from './ToolsTabComponent.jsx';

class OptionsPageComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const tabComponents = [
			GeneralTabComponent,
			ToolsTabComponent,
		];

		const className = 'cgb-options-page';

		return <>
			<div className={ className }>

				<Tabs
					defaultIndex={ 0 }
					defaultFocus={ true }
				>

					<TabList>
						{ [...tabComponents].map( ( TabComponent, index ) =>
							<Tab key={ index }>
								{ TabComponent.tabInfo.title }
							</Tab>
						) }
					</TabList>

					{ [...tabComponents].map( ( TabComponent, index ) =>
						<TabPanel key={ index }>
							<TabComponent
								className={ className + '-tab' }
							/>
						</TabPanel>
					) }

				</Tabs>
			</div>
		</>;

	}
}

export default OptionsPageComponent;
