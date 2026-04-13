<?php
/**
 * The template for displaying all single posts
 *
 * @package unus-blog
 */

get_header();
?>

<main id="primary" class="site-main single-post">
	<div class="container">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<header class="entry-header">
					<div class="entry-meta">
						<span class="posted-on"><?php echo get_the_date(); ?></span>
						<span class="category"><?php the_category( ', ' ); ?></span>
					</div>
					<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
					<div class="post-thumbnail">
						<?php the_post_thumbnail( 'full' ); ?>
					</div>
				<?php endif; ?>

				<div class="entry-content">
					<?php
					the_content();

					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'unus-blog' ),
						'after'  => '</div>',
					) );
					?>
				</div>

				<footer class="entry-footer">
					<div class="post-tags">
						<?php the_tags( '<span class="tags-title">Tags:</span> ', ', ', '' ); ?>
					</div>
				</footer>
			</article>

			<nav class="navigation post-navigation" aria-label="Posts">
				<div class="nav-links">
					<div class="nav-previous"><?php previous_post_link( '%link', '&larr; %title' ); ?></div>
					<div class="nav-next"><?php next_post_link( '%link', '%title &rarr;' ); ?></div>
				</div>
			</nav>

			<?php
			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile;
		?>
	</div>
</main>

<?php
get_footer();
