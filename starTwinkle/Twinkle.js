(function() {
	var starList = [];
	var imgStar = new Image();
	var ctx = document.getElementById("starCanvas").getContext("2d");
	imgStar.src = "star.png";

	imgStar.onload = function() {
		var Star = function(options) {
			for (var key in options) {
				this[key] = options[key];
			}
		};
		// {
		// 	  img:img,x:x,y:y
		// }
		// t: current_time, b: begin_value, c: change_value, d: duration
		// linear: function(t, b, c, d) {
		//     return c * (t / d) + b;
		// },
		Star.prototype = {
			constructor: Star,
			render: function() {
				var ctx = this.ctx;
				var img = this.img;
				var anim = this.animation;
				//count the cur scale
				var easingFunc = anim.easing;
				var scale;
				if (!anim.fading) {
					this.scale = easingFunc(anim.dt, 0, 1, anim.d);
				} else {
					this.scale = easingFunc(anim.dt, 1, -1, anim.d);
				}
				ctx.drawImage(img, this.x - 36 * this.scale, this.y - 36 * this.scale, 72 * this.scale, 72 * this.scale);
			}
		};
		//init starList
		for (var i = 0; i < 200; i++) {
			starList.push(new Star({
				img: imgStar,
				x: Math.random() * 800,
				y: Math.random() * 600,
				ctx: ctx,
				scale: 0,
				animation: {
					d: 1000,
					fading: false,
					dt: 0,
					easing: window.easings['linear'],
					delay: Math.random() * 1000
				}
			}));
		}
		var render = function() {
			ctx.clearRect(0, 0, 800, 600);
			var t = new Date();
			for (var i = 0; i < starList.length; i++) {
				var s = starList[i];
				var anim = s.animation;
				var dt = t - T;
				anim.dt = (dt - anim.delay) % anim.d;
				if (parseInt((dt - anim.delay) / anim.d) % 2 > 0) {
					starList[i].animation.fading = true;
				} else {
					starList[i].animation.fading = false;
				}
				starList[i].render();
			}
			requestAnimationFrame(render);
		}
		var T = new Date().getTime();
		render();
	}
})();