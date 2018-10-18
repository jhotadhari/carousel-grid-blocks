<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Cgb_Register_Blocks {

	protected static $instance = null;

	protected $namspaces = array(
		'cgb/grid',
		'cgb/carousel',
	);

	protected $handles = array(
		'editor' => 'cgb_blocks_editor',
		'frontend' => 'cgb_blocks_frontend',
		'common' => 'cgb_blocks',
	);

	protected $rest_fields = array(
		'cgb_srcset' => array('attachment'),
		'cgb_sizes' => array('attachment'),
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
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_assets' ) );
		add_action( 'rest_api_init', array( $this, 'register_rest_fields' ) );
	}

	public function register_block() {
		if ( function_exists( 'register_block_type' ) ) {

			foreach( $this->namspaces as $namspace ) {
				register_block_type( $namspace, array(
					'editor_script' => $this->get_handle( 'editor' ),
					'editor_style' => $this->get_handle( 'common' ),
					'script' => $this->get_handle( 'frontend' ),
					'style' => $this->get_handle( 'common' ),
					'render_callback' => array( $this, 'render_' . str_replace( 'cgb/', '', $namspace ) ),
				) );
			}

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
			'pluginDirUrl' => Cgb_Carousel_Grid_Blocks::plugin_dir_url(),
			'locale' => gutenberg_get_jed_locale_data( 'cgb' ),
			'is_active_wp_rest_filter' => class_exists( 'Wp_Rest_Filter_Loader' ),
		);
		return array();
	}

	public function enqueue_block_assets() {

		if ( ! is_admin() )
			$this->register_gutenberg_assets();

		// enqueue style
		$handle = $this->get_handle( 'common' );
		$deps = is_admin() ? array( 'wp-edit-blocks' ) : array();
		wp_enqueue_style(
			$handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/css/' . $handle . '.min.css',
			$deps,
			filemtime( Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'css/' . $handle . '.min.css' )
		);

		// register script
		$handle = is_admin() ? $this->get_handle( 'editor' ) : $this->get_handle( 'frontend' );
		$deps = is_admin() ? array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		) : array(
			'utils',
			'wp-data',
			'wp-api',
			'wp-i18n',
			'wp-blocks',
			'lodash',
			'underscore',
			'react',
			'react-dom',
			'wp-components',
		);

		wp_register_script(
			$handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/js/' . $handle . '_loader.min.js',
			$deps,
			filemtime( Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'js/' . $handle . '_loader.min.js' ),
			true
		);

		// enqueue script
		wp_localize_script( $handle, 'cgbBlocks', $this->get_localize_data() );
		wp_enqueue_script( $handle );

	}

	protected function register_gutenberg_assets() {
		$suffix = SCRIPT_DEBUG ? '' : '.min';
		$react_suffix = ( SCRIPT_DEBUG ? '.development' : '.production' ) . $suffix;
		wp_register_script(
			'react',
			'https://unpkg.com/react@16.4.1/umd/react' . $react_suffix . '.js'
		);
		wp_register_script(
			'react-dom',
			'https://unpkg.com/react-dom@16.4.1/umd/react-dom' . $react_suffix . '.js',
			array( 'react' )
		);
		$moment_script = SCRIPT_DEBUG ? 'moment.js' : 'min/moment.min.js';
		wp_register_script(
			'moment',
			'https://unpkg.com/moment@2.22.1/' . $moment_script,
			array()
		);

		gutenberg_register_scripts_and_styles();
	}

	public function register_rest_fields() {
		foreach( $this->rest_fields as $field_name => $posttypes ) {
			foreach( $posttypes as $posttype ) {
				register_rest_field( $posttype,
					$field_name,
					array(
						'get_callback'    => array( $this, 'get_rest_field' ),
						'update_callback' => null,
						'schema'          => null,
						)
					);
			}
		}
	}

	public function get_rest_field( $object, $field_name, $request ) {
		switch( $field_name ) {
			case 'cgb_srcset':
				$image = wp_get_attachment_metadata( $object['id'] );
				$image_url = wp_get_attachment_url( $object['id'] );
				$size_array = array();
				foreach( $image['sizes'] as $size ){
					array_push( $size_array, array( $size['width'], $size['height'] ) );
				}
				$srcset = wp_calculate_image_srcset( $size_array, $image_url, $image['image_meta'], $object['id'] );
				return $srcset ? $srcset : $image_url . ' ' .$image['width'] . 'w';
				break;
			case 'cgb_sizes':
				$image = wp_get_attachment_metadata( $object['id'] );
				$image_url = wp_get_attachment_url( $object['id'] );
				return wp_calculate_image_sizes( 'full', $image_url, null, $object['id'] );
				break;
		}
	}

	public function render_grid( $attributes ) {
		return $this->render( $attributes, 'grid' );
	}

	public function render_carousel( $attributes ) {
		return $this->render( $attributes, 'carousel' );
	}

	public function render( $attributes, $name ) {

		$attributes = cgb_decode_attributes( $attributes, array(
			'settings',
			'gridSettings',
			'imageHoverEffectSettings',
			'imageHighlightEffectSettings',
			'imageCaptionSettings',
		) );

		$html_arr = array(
			'<div ',
				'class="cgb-block-wrapper" ',
				'data-cgb="' . htmlspecialchars( json_encode( $attributes ), ENT_QUOTES, 'UTF-8' ) . '"',
			'>',
				'<div ',
					'class="cgb-' . $name . '" ',
				'>',
				'</div>',
			'</div>',
		);

		return implode( '', $html_arr );

	}

}

function cgb_register_blocks() {
	return Cgb_Register_Blocks::get_instance();
}

cgb_register_blocks();

?>