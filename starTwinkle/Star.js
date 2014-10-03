"use strict";

var Star;
(function(exports, undefined) {

    Star = function(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    };

    Star.prototype = {

        constructor: Star,

        x: 0,
        y: 0,
        w: 0,
        h: 0,
        twinkling: false,
        twinkled: false,
        img: 0,

        shakeX: 0,
        shakeY: 0,
        init: function(scene) {
            // this.scene = scene;
            this.img = ResourcePool.get("star");
            this.imgW = this.img.width;
            this.imgH = this.img.height;
            var scale = 0.5;
            this.w = this.imgW * scale;
            this.h = this.imgH * scale;

            this.shakeOffset = Utils.randomInt(10, 20) * 10;
        },

        resize: function() {

        },

        twinkle: function() {
            this.twinkled = true;
            var scale = Utils.randomInt(7, 10) / 10;
            var w = this.imgW * scale;
            var h = this.imgH * scale;

            var tween1 = new TWEEN.Tween(this)
                .to({
                    w: w * 1.5,
                    h: h * 1.5,
                }, 300)
                .easing(TWEEN.Easing.Cubic.Out).onComplete(function() {
                    tween2.start();
                });
            var tween2 = new TWEEN.Tween(this)
                .to({
                    w: w,
                    h: h,
                }, 900)
                .easing(TWEEN.Easing.Cubic.Out);

            tween1.start();

        },

        // update: function(timeStep, now) {


        // },

        render: function(context, timeStep, now) {
            if (this.twinkled) {
                this.shakeX = 0; //Math.sin(now/400)*2;
                this.shakeY = Math.sin(now / 400 + this.shakeOffset) * 1;
                context.globalAlpha = (Math.sin(now / 400 + this.shakeOffset) + 1) * 0.15 + 0.7;
            } else {
                context.globalAlpha = 0.3;
            }
            context.drawImage(this.img, this.x - this.w / 2 + this.shakeX, this.y - this.h / 2 + this.shakeY, this.w, this.h);
            context.globalAlpha = 1;
        },

    };


}(this));