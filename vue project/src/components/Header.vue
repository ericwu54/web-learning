<template>
	<nav class="navbar navbar-light navbar-expand-sm bg-light">
		<router-link to="/" class="navbar-brand" tag="a">Stock Trader</router-link>

		<div class="collapse navbar-collapse">
			<ul class="navbar-nav mr-auto">
				<router-link
					:to="{ name: 'portfolio' }"
					tag="li"
					class="nav-item"
					activeClass="active"
				>
					<a class="nav-link">Portfolio</a>
				</router-link>

				<router-link
					:to="{ name: 'stocks' }"
					tag="li"
					class="nav-item"
					activeClass="active"
					><a class="nav-link">Stocks</a></router-link
				>
			</ul>
			<ul class="navbar-nav">
				<li><a href="#" class="nav-link">End Day</a></li>
				<li class="nav-item dropdown">
					<a
						class="nav-link dropdown-toggle"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Save & Load <span class="caret"></span>
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" href="#">Save Data</a>
						<a class="dropdown-item" href="#">Load Data</a>
						<div class="dropdown-divider"></div>
						<a class="dropdown-item" href="#">Something else here</a>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	export default {};
</script>
