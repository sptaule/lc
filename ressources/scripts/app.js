'use strict';

  function ThreejsScene() {
    this.sphereRadius = 19;
    this.sphereColor = 0x0C0C0C;
    this.animationStep = 0.005;
  }

  ThreejsScene.prototype.init = function () {
    this.scene = new THREE.Scene();
    this.initCamera();
    this.initLight();
    this.initRenderer();
    this.initEffectComposer();
    // this.initGlitch();
    this.shiftRGB();
    this.makeEffectCopy();
    this.setEventListeners();

    this.initObjects();
    this.addLogo();
    this.addSmoke();

    this.render();
  };


  ThreejsScene.prototype.initCamera = function () {
    var self = this;

    self.camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 1000);
    self.camera.position.x = 0;
    self.camera.position.y = 0;
    self.camera.position.z = 300;
    self.camera.updateProjectionMatrix();
    self.camera.lookAt(self.scene.position);
  };


  ThreejsScene.prototype.initLight = function () {
    var self = this;
    var light;

    light = new THREE.DirectionalLight(0xFFFFFF, 2);
    light.position.set(20, 15, 20);
    light.castShadow = true;

    self.scene.add(light);
  };


  ThreejsScene.prototype.initRenderer = function () {
    var self = this;

    self.renderer = new THREE.WebGLRenderer({ alpha: true });
    self.renderer.setClearColor(0xffffff, 0);

    self.renderer.setPixelRatio(window.devicePixelRatio);
    self.renderer.setSize(window.innerWidth, window.innerHeight);
    self.renderer.shadowMap.enabled = true;

    self.addToDOM();
  };


  ThreejsScene.prototype.initEffectComposer = function () {
    var self = this;

    self.composer = new THREE.EffectComposer(self.renderer);
    self.composer.addPass(new THREE.RenderPass(self.scene, self.camera));
  };


  ThreejsScene.prototype.initGlitch = function () {
    var glitchPass = new THREE.GlitchPass(1);

    this.composer.addPass(glitchPass);
  };


  ThreejsScene.prototype.shiftRGB = function () {
    var self = this;

    var rgbShift = new THREE.ShaderPass(THREE.RGBShiftShader);
    var rgbAmount = 0.0015;
    var angle = 3.5;

    rgbShift.uniforms.amount.value = rgbAmount;
    rgbShift.uniforms.angle.value = angle;
    rgbShift.enabled = true;

    self.composer.addPass(rgbShift);


    self.tl = new TimelineMax({repeat: Infinity, repeatDelay: 0.00001, delay: 0.5});
    self.tl.to(rgbShift.uniforms.angle, 42, {value: 0.5, ease: Power1.easeInOut});
    self.tl.to(rgbShift.uniforms.amount, 42, {value: 0.004, ease: Power1.easeInOut}, "=-2");
  };


  ThreejsScene.prototype.makeEffectCopy = function() {
    var self = this;

    var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    effectCopy.renderToScreen = true;
    self.composer.addPass(effectCopy);
  };


  ThreejsScene.prototype.addToDOM = function () {
    var container = document.getElementById('canvas-container');
    var canvas = container.getElementsByTagName('canvas');

    if (canvas.length > 0) {
      container.removeChild(canvas[0]);
    }
    container.appendChild(this.renderer.domElement);
  };


  ThreejsScene.prototype.initObjects = function () {
    var self = this;
    var geometry, material;

    self.sphereGroup = new THREE.Object3D();

    geometry = new THREE.SphereGeometry(self.sphereRadius, 36, 36);
    material = new THREE.MeshPhongMaterial({
      opacity: 0.5,
      color: self.sphereColor,
      transparent: true,
      shininess: 10
    });
    self.sphereOuter = new THREE.Mesh(geometry, material);
    self.sphereOuter.castShadow = false;
    self.sphereOuter.renderOrder = 2;

    self.sphereGroup.add(self.sphereOuter);

    geometry = new THREE.SphereGeometry(self.sphereRadius - 36, 36, 36);
    material = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('/ressources/images/jellyfish.jpg'),
      transparent: false,
      opacity: 0.70,
      overdraw: 1,
    });
    self.sphereInner = new THREE.Mesh(geometry, material);

    self.sphereInner.castShadow = false;
    self.sphereGroup.scale.x = 0;
    self.sphereGroup.scale.y = 0;
    self.sphereGroup.scale.z = 0;
    self.sphereInner.renderOrder = 1;

    self.sphereGroup.add(self.sphereInner);

    self.tl = new TimelineMax({repeat: 0});

    self.tl.to(self.sphereGroup.scale, 1.5, {x: 1, y: 1, z: 1, ease: Power1.ease});

    self.tl = new TimelineMax({repeat: -1, repeatDelay: 0.00001, delay: 1, yoyo: true});
    self.tl.to(self.sphereGroup.position, 1, {x: 0, y: 0, z: 0, ease: Power1.easeInOut});
    self.tl.to(self.sphereGroup.position, 2, {x: 0, y: 1, z: 0, ease: Power1.easeInOut});
    self.tl.to(self.sphereGroup.position, 2, {x: 0, y: -1, z: 0, ease: Power1.easeInOut});
    self.tl.to(self.sphereGroup.position, 2, {x: 0, y: 0, z: 0, ease: Power1.easeInOut});

    self.scene.add(self.sphereGroup);
  };


  ThreejsScene.prototype.addLogo = function () {
    var self = this;

    var geometry = new THREE.PlaneGeometry( 18, 18);
    var material = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('/ressources/images/logo-lc-medium.png'),
      transparent: true,
      opacity: 1
    });

    var plane = new THREE.Mesh( geometry, material );
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.renderOrder = 0;

    self.sphereGroup.add(plane);
  };


  // LA

  ThreejsScene.prototype.addSmoke = function () {
    var self = this;

    var geometry = new THREE.PlaneGeometry(300, 300);
    var material = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(''),
      transparent: true,
      opacity: 0.2
    });


    self.smokeGroup = new THREE.Object3D();

    var plane = new THREE.Mesh( geometry, material );
    self.smokeGroup.add(plane);

    plane = new THREE.Mesh( geometry, material );
    plane.rotation.z = 90;

    self.smokeGroup.add(plane);

    self.smokeGroup.scale.x = 0;
    self.smokeGroup.scale.y = 0;
    self.smokeGroup.scale.z = 0;

    self.tl = new TimelineMax({repeat: 0});
    self.tl.to(self.smokeGroup.scale, 1.5, {x: 1, y: 1, z: 1, ease: Power1.easeOut});
    self.tl.to(plane.material, 1.2, {opacity: 0.5, ease: Power1.easeOut}, "=-1");


    self.scene.add(self.smokeGroup);
  };


  ThreejsScene.prototype.setEventListeners = function () {
    var self = this;

    // window.addEventListener('resize', self.onWindowResize, true);
  };


  ThreejsScene.prototype.onWindowResize = function () {
    var self = this;

    self.camera.aspect = window.innerWidth / window.innerHeight;
    self.camera.updateProjectionMatrix();
    self.renderer.setSize(window.innerWidth, window.innerHeight);
  };


  ThreejsScene.prototype.render = function () {
    var self = this;

    self.animationStep += 0.0015;

    self.sphereInner.rotation.y = -self.animationStep;

    requestAnimationFrame(this.render.bind(this));
    self.composer.render();
  };

  try {
    var threejsScene = new ThreejsScene();
    threejsScene.init();
  } catch (e) {
    var errorReport = 'Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>';
    var error = document.getElementById('error');
    error.append(errorReport + e);
  }