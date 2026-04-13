<?php
/**
 * The main template file - Editorial Version
 *
 * @package unus-blog
 */

get_header();
?>

<main id="primary" class="site-main blog-editorial">
	<?php if ( have_posts() ) : $post_count = 0; ?>
		
		<div class="container-fluid">
			<div class="post-grid-editorial">
				<?php
				while ( have_posts() ) :
					the_post();
					$post_count++;

					// O primeiro post é o destaque (Hero)
					if ( 1 === $post_count && ! is_paged() ) :
						?>
						<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card-hero' ); ?>>
							<a href="<?php the_permalink(); ?>" class="hero-image-wrapper">
								<?php if ( has_post_thumbnail() ) : ?>
									<?php the_post_thumbnail( 'full' ); ?>
								<?php endif; ?>
								<div class="hero-overlay"></div>
							</a>

							<div class="hero-content">
								<div class="entry-meta">
									<span class="category-badge"><?php the_category( ' ' ); ?></span>
									<span class="reading-time"><?php echo unus_get_reading_time( get_the_content() ); ?> min de leitura</span>
								</div>
								<?php the_title( '<h2 class="hero-title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' ); ?>
								<div class="hero-excerpt">
									<?php echo wp_trim_words( get_the_excerpt(), 30 ); ?>
								</div>
								<a href="<?php the_permalink(); ?>" class="read-more-link">
									Ler Artigo Completo 
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
								</a>
							</div>
						</article>
						
						<div class="section-divider">
							<span>Recentes</span>
						</div>
						
						<div class="posts-secondary-grid">
					<?php else : ?>
						
						<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card-standard' ); ?>>
							<div class="card-image-outer">
								<a href="<?php the_permalink(); ?>" class="card-image-link">
									<?php if ( has_post_thumbnail() ) : ?>
										<?php the_post_thumbnail( 'medium_large' ); ?>
									<?php endif; ?>
								</a>
								<span class="category-tag"><?php the_category( ', ' ); ?></span>
							</div>

							<div class="card-body">
								<div class="card-meta">
									<?php echo get_the_date(); ?> • <?php echo unus_get_reading_time( get_the_content() ); ?> min
								</div>
								<?php the_title( '<h3 class="card-title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h3>' ); ?>
								<div class="card-excerpt">
									<?php echo wp_trim_words( get_the_excerpt(), 18 ); ?>
								</div>
							</div>
						</article>

					<?php 
					endif;
				endwhile; 
				?>
				</div> <!-- .posts-secondary-grid -->
			</div>

			<div class="blog-pagination">
				<?php
				the_posts_pagination( array(
					'prev_text' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5m7-7-7 7 7 7"/></svg>',
					'next_text' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>',
				) );
				?>
			</div>

		</div>

	<?php else : ?>
		<div class="container">
			<p>Nenhum conteúdo encontrado.</p>
		</div>
	<?php endif; ?>
</main>

<?php
get_footer();
