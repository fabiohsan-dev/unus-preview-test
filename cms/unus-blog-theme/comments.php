<?php
/**
 * The template for displaying comments
 *
 * @package unus-blog
 */

if ( post_password_required() ) {
	return;
}
?>

<div id="comments" class="comments-area">

	<?php if ( have_comments() ) : ?>
		<h2 class="comments-title">
			<?php
			$unus_blog_comment_count = get_comments_number();
			if ( '1' === $unus_blog_comment_count ) {
				printf(
					/* translators: 1: title. */
					esc_html__( 'Um comentário em &ldquo;%1$s&rdquo;', 'unus-blog' ),
					'<span>' . wp_kses_post( get_the_title() ) . '</span>'
				);
			} else {
				printf( 
					/* translators: 1: comment count, 2: title. */
					esc_html( _nx( '%1$s comentário em &ldquo;%2$s&rdquo;', '%1$s comentários em &ldquo;%2$s&rdquo;', $unus_blog_comment_count, 'comments title', 'unus-blog' ) ),
					number_format_i18n( $unus_blog_comment_count ),
					'<span>' . wp_kses_post( get_the_title() ) . '</span>'
				);
			}
			?>
		</h2>

		<?php the_comments_navigation(); ?>

		<ol class="comment-list">
			<?php
			wp_list_comments(
				array(
					'style'      => 'ol',
					'short_ping' => true,
					'avatar_size' => 48,
				)
			);
			?>
		</ol>

		<?php
		the_comments_navigation();

		// If comments are closed and there are comments, let's leave a little note, shall we?
		if ( ! comments_open() ) :
			?>
			<p class="no-comments"><?php esc_html_e( 'Comentários estão fechados.', 'unus-blog' ); ?></p>
			<?php
		endif;

	endif; // Check for have_comments().

	comment_form( array(
		'class_submit' => 'btn-primary',
		'title_reply_before' => '<h3 id="reply-title" class="comment-reply-title">',
		'title_reply_after'  => '</h3>',
	) );
	?>

</div><!-- #comments -->
