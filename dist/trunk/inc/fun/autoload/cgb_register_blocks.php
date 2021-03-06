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
					'editor_style' => $this->get_handle( 'editor' ),
					'script' => $this->get_handle( 'frontend' ),
					'style' => $this->get_handle( 'frontend' ),
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
			'is_active_wp_rest_filter' => class_exists( 'Wp_Rest_Filter_Loader' ),
		);
		return array();
	}

	public function enqueue_block_assets() {

		if ( ! apply_filters( 'cgb_enqueue_block_assets', true ) )
			return;

		// enqueue style
		$handle = is_admin() ? $this->get_handle( 'editor' ) : $this->get_handle( 'frontend' );
		$deps = is_admin() ? array(
			'wp-edit-blocks',
		) : array();
		wp_enqueue_style(
			$handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/css/' . $handle . '.min.css',
			$deps,
			filemtime( Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'css/' . $handle . '.min.css' )
		);

		// register script
		$deps = is_admin() ? array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		) : array(
			'lodash',
			'react',
			'react-dom',
			'wp-data',
			'wp-i18n',
			'wp-api-fetch',
			'wp-html-entities',
		);

		wp_register_script(
			$handle,
			Cgb_Carousel_Grid_Blocks::plugin_dir_url() . '/js/' . $handle . '_loader.min.js',
			$deps,
			filemtime( Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'js/' . $handle . '_loader.min.js' ),
			true
		);

		// localize, set translation and enqueue script
		wp_localize_script( $handle, 'cgbBlocks', $this->get_localize_data() );
		wp_set_script_translations( $handle, 'cgb', Cgb_Carousel_Grid_Blocks::plugin_dir_path() . 'languages' );
		wp_enqueue_script( $handle );
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
		$image_meta = wp_get_attachment_metadata( $object['id'] );

		switch( $field_name ) {
			case 'cgb_srcset':
				if ( ! is_array( $image_meta ) || ! array_key_exists( 'sizes', $image_meta ) )
					return '';
				$image_url = wp_get_attachment_url( $object['id'] );
				$srcset_sizes_array = array();
				foreach( $image_meta['sizes'] as $size ){
					array_push( $srcset_sizes_array, array( $size['width'], $size['height'] ) );
				}
				$srcset = wp_calculate_image_srcset( $srcset_sizes_array, $image_url, $image_meta, $object['id'] );
				return $srcset ? $srcset : $image_url . ' ' .$image_meta['width'] . 'w';
				break;
			case 'cgb_sizes':
				if ( ! is_array( $image_meta ) || ! array_key_exists( 'sizes', $image_meta ) )
					return array();
				$image_sizes_array = array();
				$image_url = wp_get_attachment_url( $object['id'] );
				foreach( $image_meta['sizes'] as $size_key => $size ){
					array_push( $image_sizes_array, array(
						'width' => $size['width'],
						'attr' => wp_calculate_image_sizes( $size_key, $image_url, $image_meta, $object['id'] )
					) );
				}
				return $image_sizes_array;
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
			'carouselSettings',
			'imageHoverEffectSettings',
			'imageHighlightEffectSettings',
			'imageControlsSettings',
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