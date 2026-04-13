<?php
/**
 * The template for displaying search results pages
 *
 * @package unus-blog
 */

get_header();
?>

<main id="primary" class="site-main blog-search">
	<header class="page-header">
		<div class="container-fluid">
			<h1 class="page-title">
				<?php
				/* translators: %s: search query. */
				printf( esc_html__( 'Resultados para: %s', 'unus-blog' ), '<span>' . get_search_query() . '</span>' );
				?>
			</h1>
		</div>
	</header>

	<div class="container-fluid">
		<div class="post-grid">
			<?php
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					?>
					<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
						<a href="<?php the_permalink(); ?>" class="post-card-image-link">
							<?php if ( has_post_thumbnail() ) : ?>
								<div class="post-thumbnail">
									<?php the_post_thumbnail( 'large' ); ?>
								</div>
							<?php else: ?>
								<div class="post-thumbnail-placeholder"></div>
							<?php endif; ?>
						</a>

						<div class="post-card-content">
							<header class="entry-header">
								<div class="entry-meta">
									<span class="posted-on"><?php echo get_the_date(); ?></span>
									<span class="category"><?php the_category( ', ' ); ?></span>
								</div>
								<?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' ); ?>
							</header>

							<div class="entry-excerpt">
								<?php the_excerpt(); ?>
							</div>

							<footer class="entry-footer">
								<a href="<?php the_permalink(); ?>" class="read-more">Ler mais <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></a>
							</footer>
						</div>
					</article>
					<?php
				endwhile;

				the_posts_navigation();

			else :
				?>
				<div class="no-results">
					<p>Lamentamos, mas nada corresponde aos seus termos de busca. Por favor, tente novamente com algumas palavras-chave diferentes.</p>
					<?php get_search_form(); ?>
				</div>
				<?php
			endif;
			?>
		</div>
	</div>
</main>

<?php
get_footer();
