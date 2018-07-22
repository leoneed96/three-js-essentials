import * as Stats from "stats.js";
export default{
    name: 'utils',
    createStats: (container) => {
      let statsObj = new Stats();
      statsObj.setMode(0);
      statsObj.domElement.style.position = "absolute";
      statsObj.domElement.style.left = "0px";
      statsObj.domElement.style.top = "0px";
      container.appendChild(statsObj.domElement);
      return statsObj;
    }
}