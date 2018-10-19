import React, { Component } from "react";
import ReactDOM from "react-dom";


import {TEST_POINTS,POLYGON} from "./TestData"

import {isPointInPoly} from "./PointInside"

class Canvas extends Component {

  constructor(props) {
    super(props)
    this.canvas = this.refs.canvas
    this.mousePosition = {}

  }

  getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();

    return  {
      id: 0,
      latitude: mouseEvent.clientX - rect.left,
      longitude: mouseEvent.clientY - rect.top
    };
  }

  checkPosition(pos) {

    console.log("position",pos)

    console.log(isPointInPoly(pos,POLYGON))

  }

    componentDidMount() {



      this.refs.canvas.addEventListener("mousedown",e => {
            this.mousePosition = this.getMousePos(this.refs.canvas, e)
            this.checkPosition(this.mousePosition)

            console.log("this.mousePosition",this.mousePosition)

          }, false);


        this.updateCanvas();
    }


    updateCanvas() {


        const objctx = this.refs.canvas.getContext('2d');
        objctx.beginPath();

        let start = POLYGON[0]

        objctx.moveTo(start.latitude, start.longitude);

        POLYGON.shift()

        POLYGON.forEach(p => {objctx.lineTo(p.latitude,p.longitude)})

        objctx.closePath();
        objctx.fillStyle = "rgb(200,0,0)";
        objctx.fill();
    }



    render() {
        return (
        <div className = "App">
          <p>Click Me and Check the Console</p>
            <canvas ref="canvas" width={300} height={300}/>
            </div>
        );
    }
}

export default Canvas;
