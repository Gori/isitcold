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
		<div id="container">
			<div id='main'>
				<div id='mainholder'>
					<div class='headline' id='starttext'>IS IT COLD?</div>
					<div id='maincontent'>
						<div id='icontext'><div id='iconholder'>iconText</div></div>
						<div class='headline' id='headline'>temperature</div>
						<p class='textline' id='infotext'>description</p>
						<p class='textline' id='sharetext'>
							Share this:<br>
							<img id="twittershare" class="sharebutton" src="/img/twitter.png" width="48" height="48"/> <img id="faceshare" class="sharebutton" src="/img/facebook.png" width="48" height="48"/>
						</p>
					</div>
					<div class="footer"><p class="social"><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.isitcold.com" data-count="vertical">Tweet</a><script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.isitcold.com&amp;send=false&amp;layout=box_count&amp;width=55&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=62&amp;appId=144686638922410" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:55px; height:62px;" allowTransparency="true"></iframe>
</p>Copyright © 2012 <a href="http://kindalikeabigdeal.com">Kinda Like A Big Deal</a> - <a href="/about.html">Are we cold?</a>
</div>
				</div>
			</div>
		</div>

		<script src="/js/vendor/jquery.js"></script>
		<script src="/js/vendor/TweenLite.js"></script>
		<script src="/js/vendor/plugins/CSSPlugin.js"></script>
		<script src="/js/vendor/plugins/EasePack.js"></script>
		<script src="/js/isitcold.js"></script>
	</body>
</html>