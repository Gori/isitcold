<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Is It Cold?</title>
		<link rel="stylesheet" href="/css/isitcold.css" type="text/css">
		<script type="text/javascript" src="//use.typekit.net/iyb1twf.js"></script>
		<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
		<meta name="author" content="Kinda Like A Big Deal">
		<meta name="description" content="The worlds cutest and smallest weather site.">
		<meta name="keywords" content="weather,kindalikeabigdeal,isitcold">
		<script>
			<?php
				if (isset($_GET['country']) && isset($_GET['city'])) { 
					$country = $_GET['country'];
					$city = $_GET['city'];
				} else {
					$country = "null";
					$city = "null";
				}
			?>
			var IsItCold = IsItCold || {};
			IsItCold.country = "<?php echo $country ?>";
			IsItCold.city = "<?php echo $city ?>";
		</script>
	</head>
	<body>
		<div id="fb-root"></div>
		<div id="container">
			<div id="main">
				<div id="mainholder">
					<div class="headline" id="starttext">IS IT COLD?</div>
					<div id="maincontent">
						<div id="icontext"><div id="iconholder">iconText</div></div>
						<p class="textline" id="startinfotext">startinfo</p>
						<div class="headline" id="headline">temperature</div>
						<p class="textline" id="infotext">description</p>
						<p class="textline" id="sharetext">
							Share this:<br>
							<img id="twittershare" class="sharebutton" src="/img/twitter.png" width="48" height="48"/> <img id="faceshare" class="sharebutton" src="/img/facebook.png" width="48" height="48"/>
						</p>
					</div>
					<div class="footer">
						<div class="social">
							<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.isitcold.com" data-count="vertical">Tweet</a>
							<div class="fb-like" data-href="http://www.isitcold.com" data-send="false" data-layout="box_count" data-width="55" data-show-faces="false"></div>
						</div>

						<p class="copyright">Copyright © 2012 <a href="http://kindalikeabigdeal.com">Kinda Like A Big Deal</a> - <a href="/about.html">Are we cold?</a></p>
					</div>
				</div>
			</div>
		</div>

		<script src="/js/vendor/jquery.js"></script>
		<script src="/js/vendor/TweenLite.js"></script>
		<script src="/js/vendor/plugins/CSSPlugin.js"></script>
		<script src="/js/vendor/plugins/EasePack.js"></script>
		<script type="text/javascript">
			(function() {
					var li = document.createElement('script'); li.type = 'text/javascript'; li.async = true;
					li.src = '//platform.stumbleupon.com/1/widgets.js';
					var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(li, s);
			})();
			(function() {
					var li = document.createElement('script'); li.type = 'text/javascript'; li.async = true;
					li.src = '//platform.twitter.com/widgets.js';
					var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(li, s);
			})();
			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		</script>
		<script src="/js/isitcold.js"></script>

		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-33836286-1']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
	</body>
</html>
