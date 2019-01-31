<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * ???
 */
class Cgb_Options_Page {

	/**
 	 * Option Page slug
 	 * @var string
 	 */
	private $key = 'cgb';

	/**
 	 * Assets Handle
 	 * @var string
 	 */
	protected $handle = 'cgb_options_page';

	/**
	 * Options Page title
	 * @var string
	 */
	protected $title = '';


	/**
	 * Options Page hook
	 * @var string
	 */
	protected $options_page = '';

	/**
	 * Holds an instance of the object
	 *
	 * @var Cgb_Options_Page
	 */
	protected static $instance = null;

	/**
	 * Returns the running object
	 *
	 * @return Cgb_Options_Page
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
			self::$instance->hooks();
		}

		return self::$instance;
	}

	/**
	 * Constructor
	 * @since 0.0.1
	 */
	protected function __construct() {
		$this->title = __( 'Carousel Grid Blocks', 'cgb' );
	}

	/**
	 * Initiate our hooks
	 * @since 0.0.1
	 */
	public function hooks() {
		add_action( 'admin_menu', array( $this, 'add_options_page' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	protected function get_localize_data(){
		return array(
			// 'egal' => 'ja',
		);
	}

	/**
	 * Enqueue styles and scripts
	 * @since 0.0.1
	 */
	public function enqueue_assets( $post_id ) {
		$screen = get_current_screen();

		if ( 'settings_page_cgb' !== $screen->base )
			return;

		wp_register_script(
			$this->handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/js/' . $this->handle . '.min.js',
			array(
				'wp-i18n',
				'lodash',
				'wp-editor',
				'wp-blocks',
				'wp-block-library',
			),
			false,
			true
		);

		wp_localize_script( $this->handle, 'cgbData', $this->get_localize_data() );
		wp_set_script_translations( $this->handle, 'cgb', Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'languages' );
		wp_enqueue_script( $this->handle );

		wp_register_style(
			$this->handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/css/' . $this->handle . '.min.css'
		);
		wp_enqueue_style( $this->handle );
	}

	/**
	 * Add menu options page
	 * @since 0.0.1
	 */
	public function add_options_page() {
		$this->options_page = add_submenu_page(
			'options-general.php',
			$this->title,
			$this->title,
			'manage_options',
			$this->key,
			array( $this, 'admin_page_display' )
		);
	}

	/**
	 * Admin page markup. Mostly handled by CMB2
	 * @since  0.0.1
	 */
	public function admin_page_display() {



		// $attributes = array(
		// 	'cgbGroupId' => 'cgb/store',
		// 	'moduleProps' => array(),
		// );

		$html_arr = array(

			'<div class="wrap ' . $this->key . '">',
				'<h2>' . esc_html( get_admin_page_title() ) . '</h2>',


				'<div ',
					'class="cgb-options-page" ',
				'></div>',


				// '<div ',
				// 	'class="cgb-module" ',
				// 	'data-cgb="' . htmlspecialchars( json_encode( array_merge( $attributes, array(
				// 		'type' => 'projectFilter',
				// 		// 'moduleProps' => array(
				// 		// 	'style' => array(
				// 		// 		'backgroundColor' => '#f00',
				// 		// 	),
				// 		// ),
				// 	) ) ), ENT_QUOTES, 'UTF-8' ) . '"',
				// '></div>',

				// '<div ',
				// 	'class="cgb-module" ',
				// 	'data-cgb="' . htmlspecialchars( json_encode( array_merge( $attributes, array(
				// 		'type' => 'projectList',
				// 	) ) ), ENT_QUOTES, 'UTF-8' ) . '"',
				// '></div>',

			'</div>',
		);

		echo implode( '', $html_arr );
	}

	/**
	 * Public getter method for retrieving protected/private variables
	 * @since  0.0.1
	 * @param  string  $field Field to retrieve
	 * @return mixed          Field value or exception is thrown
	 */
	public function __get( $field ) {
		// Allowed fields to retrieve
		$allowed = array(
			'key',
			'handle',
			'title',
			'options_page',
		);
		if ( in_array( $field, $allowed, true ) ) {
			return $this->{$field};
		}

		throw new Exception( 'Invalid property: ' . $field );
	}

}

function cgb_options_page() {
	return Cgb_Options_Page::get_instance();
}
cgb_options_page();

?>