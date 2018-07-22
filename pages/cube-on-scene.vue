<template>
    <div id="container" ref="container"></div>
</template>

<script>
import * as THREE from "three";
import * as dat from "dat.gui";
import * as Stats from "stats.js";
var OrbitControls = require("three-orbit-controls")(THREE);

export default {
  name: "ThreeTest",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      stats: null,
      cameraControl: null
    };
  },
  methods: {
    initCameraAndScene() {
      var container = this.$refs.container;
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      this.camera.position.x = 15;
      this.camera.position.y = 16;
      this.camera.position.z = 13;
      this.scene = new THREE.Scene();
      this.camera.lookAt(this.scene.position);
      this.cameraControl = new OrbitControls(this.camera);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor(0x000000, 1.0);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      //stats
      this.stats = new Stats();
      this.stats.setMode(0);
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.left = "0px";
      this.stats.domElement.style.top = "0px";
      container.appendChild(this.stats.domElement);
    },
    addControlGui(controlObject) {
      var gui = new dat.GUI();
      gui.add(controlObject, "rotationSpeed", -0.05, 0.05);
      gui.add(controlObject, "opacity", 0.1, 1);
      gui.addColor(controlObject, "color");
    },
    init() {
      let cube = new THREE.CubeGeometry(6, 4, 6);
      var material = new THREE.MeshStandardMaterial({ color: "red" });
      this.mesh = new THREE.Mesh(cube, material);
      this.mesh.castShadow = true;
      this.mesh.position.y = 3;

      var planeGeometry = new THREE.PlaneGeometry(20, 20);
      var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xcccccc
      });
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.y = -2;
      var spotLight = new THREE.SpotLight(0xffffff, 1.7);
      spotLight.position.set(20, 20, 20);
      spotLight.castShadow = true;
      this.scene.add(spotLight);
      this.scene.add(this.mesh, plane);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += new Date().getSeconds() % 2 == 0 ? 0.05 : 0;
      this.mesh.rotation.y += new Date().getSeconds() % 2 !== 0 ? 0.05 : 0;
      // this.mesh.rotation.z += 0.01;

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
    this.init();
    this.animate();
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
