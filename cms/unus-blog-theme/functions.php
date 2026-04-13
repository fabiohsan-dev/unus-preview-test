<?php
/**
 * UNUS Blog functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package unus-blog
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * @global int $content_width
 */
function unus_blog_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'unus_blog_content_width', 800 );
}
add_action( 'after_setup_theme', 'unus_blog_content_width', 0 );

function unus_blog_setup() {
	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'menu-1' => esc_html__( 'Primary', 'unus-blog' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	) );
}
add_action( 'after_setup_theme', 'unus_blog_setup' );

/**
 * Enqueue scripts and styles.
 */
function unus_blog_scripts() {
	// Fonts
	wp_enqueue_style( 'unus-fonts', 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap', array(), null );

	// Theme style
	wp_enqueue_style( 'unus-blog-style', get_stylesheet_uri(), array( 'unus-fonts' ), wp_get_theme()->get( 'Version' ) );

	// Scripts
	wp_enqueue_script( 'unus-header-scroll', get_template_directory_uri() . '/js/header-scroll.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'unus_blog_scripts' );

/**
 * Reading time calculator
 */
function unus_get_reading_time( $content ) {
	$word_count = str_word_count( strip_tags( $content ) );
	$readingtime = ceil( $word_count / 200 );
	return $readingtime;
}
