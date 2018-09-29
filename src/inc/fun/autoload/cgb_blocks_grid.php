<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Cgb_Blocks_Grid {

	protected static $instance = null;
	protected $namspace = 'cgb/grid';

	protected $handles = array(
		'editor' => 'cgb_blocks',
		'frontend' => 'cgb_blocks',
	);

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
			self::$instance->hooks();
		}

		return self::$instance;
	}

	protected function __construct() {
		// ... silence
	}

	public function hooks() {
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_frontend_assets' ) );
	}

	public function register_block() {
		if ( function_exists( 'register_block_type' ) ) {
			register_block_type( $this->namspace, array(
				'editor_script' => $this->get_handle( 'editor' ),
				'editor_style' => $this->get_handle( 'editor' ),
				'style' => $this->get_handle( 'editor' ),		// same assets in admin and frontend
				'script' => $this->get_handle( 'editor' ),		// same assets in admin and frontend
				'render_callback' => array( $this, 'render' ),
			) );
		}
	}

	protected function get_handle( $key ){
		$handles = $this->handles;
		if ( array_key_exists( $key, $handles ) ){
			return $handles[$key];
		}

	}

	protected function get_localize_data(){
		return array(
			'themeDirUrl' => Cgb_Carousel_Grid_Blocks::plugin_dir_url(),
			'locale' => gutenberg_get_jed_locale_data( 'cgb' ),
		);
		return array();
	}

	// hooked on enqueue_block_assets. So function will run in admin and frontend.
	// But we will use it only on frontend if the post has this block
	public function enqueue_frontend_assets() {

		// check if we are on frontend
		if ( is_admin() )
			return;

		$handle = $this->get_handle( 'frontend' );

		wp_enqueue_style(
			$handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/css/' . $handle . '.min.css',
			array( 'wp-blocks', 'underscore' ),
			filemtime( Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'css/' . $handle . '.min.css' )
		);

		wp_register_script(
			$handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/js/' . $handle . '_loader.min.js',
			array(
			),
			filemtime( Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'js/' . $handle . '_loader.min.js' )
		);

		wp_localize_script( $handle, 'cgbBlocks', $this->get_localize_data() );

		wp_enqueue_script( $handle );
	}

	// hooked on enqueue_block_editor_assets. So function will only run in admin
	public function enqueue_editor_assets() {
		$handle = $this->get_handle( 'editor' );


		wp_register_script(
			$handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/js/' . $handle . '_loader.min.js',
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-element',
			),
			filemtime( Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'js/' . $handle . '_loader.min.js' )
		);

		wp_localize_script( $handle, 'cgbBlocks', $this->get_localize_data() );

		wp_enqueue_script( $handle );

		wp_enqueue_style(
			$handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/css/' . $handle . '.min.css',
			array( 'wp-edit-blocks' ),
			filemtime( Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'css/' . $handle . '.min.css' )
		);
	}

}

function cgb_blocks_grid() {
	return Cgb_Blocks_Grid::get_instance();
}

cgb_blocks_grid();

?>