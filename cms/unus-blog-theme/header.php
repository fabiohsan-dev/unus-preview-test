<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header id="masthead" class="site-header fixed-header">
	<div class="container-fluid">
		<div class="header-inner">
			<?php // Logo ?>
			<div class="site-branding">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<img src="https://unusnucleoimobiliario.com.br/wp-content/uploads/2021/07/xLogo_sm-1.png.pagespeed.ic.VQHWf0IouS.webp" alt="UNUS Núcleo Imobiliário" class="logo-img">
				</a>
			</div>

			<?php // Desktop Nav ?>
			<nav id="site-navigation" class="main-navigation">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'menu_id'        => 'primary-menu',
						'container'      => false,
						'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
					)
				);
				?>
			</nav>

			<?php // Favoritos / Action ?>
			<div class="header-actions">
				<a href="/favoritos" class="favoritos-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="heart-icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
					Favoritos
				</a>
			</div>

			<?php // Mobile Toggle ?>
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
				<span class="bar"></span>
				<span class="bar"></span>
			</button>
		</div>
	</div>

	<?php // Mobile Menu Container ?>
	<div id="mobile-menu" class="mobile-menu-overlay">
		<div class="mobile-menu-content">
			<nav class="mobile-navigation">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'container'      => false,
						'items_wrap'     => '<ul>%3$s</ul>',
					)
				);
				?>
			</nav>
			<div class="mobile-menu-footer">
				<a href="/favoritos" class="btn-favoritos-mobile">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
					Favoritos
				</a>
			</div>
		</div>
	</div>
</header>

<div id="content" class="site-content">
