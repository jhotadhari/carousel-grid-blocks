/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	Tab,
	Tabs,
	TabList,
	TabPanel ,
} from 'react-tabs';
import {
	get,
	keys,
} from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    BaseControl,
    TextControl,
    SelectControl,
    Placeholder,
    Button,
} = wp.components;

const {
    select,
} = wp.data;

/**
 * Internal dependencies
 */
import Icon 		from './Icon.jsx';
import slugify 		from '../../cgb_blocks/utils/slugify';

class PlaceholderChooseGroup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedBlockGroup: '',
			newBlockGroup: '',
		};

		this.setInitialBlockGroupOption = this.setInitialBlockGroupOption.bind( this );
		this.getBlockGroupIds = this.getBlockGroupIds.bind( this );
		this.getBlockGroupOptions = this.getBlockGroupOptions.bind( this );
	}

	componentDidMount() {
		this.setInitialBlockGroupOption();
	}

	componentDidUpdate( prevProps, prevState, snapshot ) {
		this.setInitialBlockGroupOption();
	}

	setInitialBlockGroupOption(){
		const { selectedBlockGroup } = this.state;
		const blockGroupOptions = this.getBlockGroupOptions();
		if ( ! selectedBlockGroup.length && blockGroupOptions.length )
			this.setState( { selectedBlockGroup: blockGroupOptions[0]['value'] } );
	}

	getBlockGroupIds() {
		return keys( get( cgbBlocks, ['stores'] ) );
	}

	getBlockGroupOptions() {
		return this.getBlockGroupIds().map( blockGroupId => { return { value: blockGroupId, label: blockGroupId } } );
	}

	render() {

		const {
			selectedBlockGroup,
			newBlockGroup,
		} = this.state;

		const {
			setAttributes,
		} = this.props;

		const blockGroupIdPrefix = 'cgb/' + select( 'core/editor' ).getCurrentPostId() + '-';

		const titles= [
			__( 'Connect to existing block group', 'cgb' ),
			__( 'Create new block group', 'cgb' ),
		];

		return <>

			<Placeholder
				icon={ <Icon type={ 'blockGroup' }/> }
				label={  __( 'Connect to Block Group', 'cgb' ) }
				instructions={ __( 'Connect this block to an existing block group or create a new block group.', 'cgb' ) }
				className={ classnames( 'editor-media-placeholder', 'cgb-choose-group', 'cgb-placeholder' ) }
			>

				<Tabs
					defaultIndex={ ! this.getBlockGroupIds().length ? 1 : 0 }
					defaultFocus={ true }
					onSelect={ ( index, lastIndex, event ) => this.setInitialBlockGroupOption() }
				>
					<TabList>
						<Tab disabled={ ! this.getBlockGroupIds().length }>{ titles[0] }</Tab>
						<Tab>{ titles[1] }</Tab>
					</TabList>

					<TabPanel>

						<SelectControl
							value={ selectedBlockGroup }
							onChange={ ( newVal ) => { this.setState( { selectedBlockGroup: newVal } ) } }
							options={ this.getBlockGroupOptions() }
						/>

						<Button
							className={ 'cgb-button' }
							disabled={ ! selectedBlockGroup.length }
							onClick={ () => setAttributes( {
								blockGroupId: selectedBlockGroup,
								setupDone: true,
							} ) }
						>
							{ titles[0] }
						</Button>

					</TabPanel>

					<TabPanel>

						<BaseControl
							className={ 'cgb-columns-field' }
						>
							<TextControl
								disabled={ true }
								className={ 'cgb-columns-field-30' }
								value={ blockGroupIdPrefix }
							/>

							<TextControl
								value={ newBlockGroup }
								onChange={ newVal => this.setState( { newBlockGroup: slugify( newVal ) } ) }
							/>
						</BaseControl>


						<Button
							className={ 'cgb-button' }
							disabled={ ! newBlockGroup.length }
							onClick={ () => setAttributes( { blockGroupId: blockGroupIdPrefix + newBlockGroup } ) }
						>
							{ titles[1] }
						</Button>


					</TabPanel>
				</Tabs>

			</Placeholder>

		</>;

	}

}

export default PlaceholderChooseGroup;
