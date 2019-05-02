import React, { useState, useEffect } from 'react';
import '../svg/cross.svg';
// import '../style/particles.css';


export function Particles() {

  useEffect(() => {
    var _setShapeSrc = (function(index) {
      switch(index) {
        case 0:
          return "../svg/cross.svg"
        case 1:
          return "../svg/square.svg"
        case 2:
          return "../svg/hollow-square.svg"
        case 3:
          return "../svg/triangle.svg"
        case 4:
          return "../hollow-circle.svg"
        case 5:
          return "../zigzag.svg"
      }
    });
    var _createClass = (function () {
      function defineProperties (target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor) {
            descriptor.writable = true;
          }
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) {
          defineProperties(Constructor.prototype, protoProps)
        }

        if (staticProps) {
          defineProperties(Constructor, staticProps); return Constructor
        }
      }
    })();

    function _classCallCheck (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    // Ref canvas & context
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    // Variables
    var color = '#CCCCCC';
    var maxParticles = 50;
    var rads = [0.25, 0.5, 0.75, 1, 1.25, 2];
    var particles = [];
    var cx = void 0;
    var cy = void 0;
    // Tracking mouse position
    canvas.addEventListener('mousemove', function (e) {
      cx = e.clientX;
      cy = e.clientY;
    }, false);
    // Particle class

    var Particle = (function () {
      function Particle (x, y, radius, shapeSrc) {
        _classCallCheck(this, Particle);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.shapeSrc = shapeSrc;
      }

      _createClass(Particle, [{
        key: 'move',
        value: function move (cx, cy) {
          // Move particles
          this.x += Math.sin(this.y / 30) * Math.cos(this.y / 30);
          this.y += Math.sin(this.x / 30) * Math.cos(this.x / 30);

          if (this.x - cx > 0) {
            this.x += 0.25;
          }
          if (this.y - cy > 0) {
            this.y += 0.5;
          }
          if (this.x - cx < 0) {
            this.x -= 0.75;
          }
          if (this.x - cx < 0) {
            this.y -= 1;
          }

          if (this.x < 0 || this.x > width) {
            this.x = cx;
          }
          if (this.y < 0 || this.y > height) {
            this.y = cy;
          }
        }
      }, {
        key: 'draw',
        value: function draw(ctx) {
          let img = new Image();
          img.src = this.shapeSrc;
          // img.fillStyle = color;

          ctx.fillStyle = color;
          ctx.drawImage(img, 0, 0, 20, 20);
          // ctx.beginPath();
          // ctx.arc(this.x, this.y, this.radius, 0, 1 * Math.PI, false);
          // ctx.fill();
        }
      }]);

      return Particle;
    })();
    // Create particles & push to array
    for (var i = 0; i < maxParticles; i++) {
      var p = new Particle(Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
        rads[Math.floor(Math.random() * rads.length)], _setShapeSrc(i % 6))
      particles.push(p);
    }
    // Animation loop
    function loop () {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      // Draw & move particles
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = '';

      try {
        for (var _iterator = particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var particle = _step.value;

          particle.draw(ctx);
          particle.move(cx, cy);
        }
        // Animation frame
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            _iteratorError.return();
          }
        }
      }

      requestAnimationFrame(loop);
    }
    // First call to loop
    loop();
  });

  return(
    <canvas id="canvas" />
  )
}