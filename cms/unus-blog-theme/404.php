<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package unus-blog
 */

get_header();
?>

<main id="primary" class="site-main error-404">
	<div class="container">
		<header class="page-header">
			<h1 class="page-title">404</h1>
			<p class="page-description">A página que você procura não foi encontrada ou não existe mais.</p>
		</header>

		<div class="page-content">
			<p>Talvez você queira voltar para a página inicial ou explorar nossas propriedades.</p>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-primary">Voltar para a Home</a>
		</div>
	</div>
</main>

<?php
get_footer();
