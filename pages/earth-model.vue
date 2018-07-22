<template>
    <div id="container" ref="container"></div>
</template>

<script>
import * as THREE from "three";
import * as dat from "dat.gui";
import * as Stats from "stats.js";
import utils from '~/plugins/utils';
const OrbitControls = require("three-orbit-controls")(THREE);

export default {
  name: "ThreeTest",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      earth: null,
      stats: null,
      cameraControl: null
    };
  },
  methods: {
    initLigth(){
      let directionalLigth = new THREE.DirectionalLight(0xffffff, 1)
      directionalLigth.position.set(100, 10, -50);
      directionalLigth.name = 'dirLigth';
      let ambientLigth = new THREE.AmbientLight(0x111111)
      this.scene.add(directionalLigth, ambientLigth);
    },
    initCameraAndScene() {
      var container = this.$refs.container;
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        16,
        1000
      );
      this.camera.position.x = 35;
      this.camera.position.y = 36;
      this.camera.position.z = 33;
      this.scene = new THREE.Scene();
      this.camera.lookAt(this.scene.position);
      this.cameraControl = new OrbitControls(this.camera);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor(0x000000, 1.0);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      //stats
      this.stats = utils.createStats(container)
    },
    init() {
      // raduis, width segments, height segments
      let sphere = new THREE.SphereGeometry(15, 45, 45); 
      let loader = new THREE.TextureLoader();
      let map = loader.load('/earthmap.jpg');
      var material = new THREE.MeshPhongMaterial( {map: map} );
      this.earth = new THREE.Mesh(sphere, material);
      this.earth.name = 'earth'
      this.scene.add(this.earth);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.earth.rotation.y += 0.002
      this.renderer.render(this.scene, this.camera);
      this.stats.update();
      this.cameraControl.update();
    }
  },
  created() {
    window.addEventListener("resize", this.onWindowResize, false);
  },
  mounted() {
    this.initCameraAndScene();
    this.initLigth();
    this.init();
    this.animate();
    // utils.createStats();
  },
  destroyed() {
    window.removeEventListener("resize", this.onWindowResize, false);
  }
};
</script>

<style lang="scss">
#container {
  height: 100vh;
}
</style>
