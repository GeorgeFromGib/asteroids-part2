
import * as ConfigData from '../assets/config.json' 
import P5, { Vector } from 'p5';
import { sketch } from "./p5-sketch";
import { IModel, ISettings } from './shared/interfaces/iConfig';


export class ScreenSize {
  width:number;
  height:number;
  center:Vector;
}

export enum Keys {
  RIGHT_ARROW,
  LEFT_ARROW,
  UP_ARROW,
  SPACE,
  RIGHT_CTRL
}

export class AsteroidsGame {
  screenSize:ScreenSize;
  settings:ISettings;
  configData:typeof ConfigData;
  elapsedTime:number=0;

  private _ge:P5;
  private _prevElapsed = 0; 
  private _keyMapper:Map<number,Keys>=new Map();

  constructor() {
    new P5((p5) => sketch(p5,this.setup));
  }

  public setup = (p5: P5) => {
    this._ge=p5;
    this.configData=ConfigData;
    
    // Creating canvas
    const canvas=this.createCanvas(p5)
    canvas.parent("app");

    this._keyMapper=new Map([
      [p5.LEFT_ARROW,Keys.LEFT_ARROW],
      [p5.RIGHT_ARROW,Keys.RIGHT_ARROW],
      [p5.UP_ARROW,Keys.UP_ARROW],
      [32,Keys.SPACE],
      [p5.CONTROL,Keys.RIGHT_CTRL]
    ]);

    this._prevElapsed = p5.millis();

    // Redirect sketch functions
    p5.draw = () => this.gameLoop();
    p5.keyPressed = () => this.keyPressed();
    p5.keyReleased = () => this.keyReleased();
    p5.mouseClicked = ()=>this.mouseClicked();

    this.screenSize=<ScreenSize>{
      width:p5.width,
      height:p5.height,
      center:p5.createVector(p5.width/2,p5.height/2)
    }
    
    // setup managers
    
  };

  public loadSounds() {
  
  }

  public keyPressed = () => {
    const key=this._keyMapper.get(this._ge.keyCode);
  };

  public keyReleased = () => {
    const key=this._keyMapper.get(this._ge.keyCode);
  };

  public mouseClicked=() => {
  }

  public gameLoop = () => {
    const timeDelta = this.getTimeDelta();

    this._ge.background(0);
    this._ge.stroke("white");

  };

  public drawClosedShape(model:IModel) {
    this._ge.noFill();
    this._ge.beginShape();
    model.vertexes.forEach(v=>{
      this._ge.vertex(v[0],v[1]);
    })
    this._ge.endShape(this._ge.CLOSE);
  }

  public drawVerticedShape(model:IModel) {
    model.vertices.forEach((v) => {
      const vx1 = model.vertexes[v[0]];
      const vx2 = model.vertexes[v[1]];
      this._ge.line(vx1[0], vx1[1], vx2[0], vx2[1]);
    })
  }
  public drawPoint(x:number,y:number) {
    this._ge.strokeWeight(2);
    this._ge.point(x,y);
  }

  public random(max:number) {
    return this._ge.random(0,max);
  }

  public randomRange(min:number,max:number) {
    return this._ge.random(min,max);
  }

  public getRandomScreenPosition(constraintPct:number):Vector {
    const widthConstraint=this.screenSize.width*constraintPct;
    const heightConstraint=this.screenSize.height*constraintPct;
    return new Vector().set(
      this.randomRange(widthConstraint,this.screenSize.width-widthConstraint),
      this.randomRange(heightConstraint,this.screenSize.height-heightConstraint))
  }

  private getTimeDelta() {
    this.elapsedTime=Math.trunc(this._ge.millis());
    const timeDelta = this.elapsedTime - this._prevElapsed;
    this._prevElapsed = this.elapsedTime
    return timeDelta;
  }

  private createCanvas(p5: P5) {
    const scr_reduction = 0.8;
    const oldTvRatio=1.33;
    const width=p5.windowHeight * oldTvRatio * scr_reduction;
    const height=p5.windowHeight * scr_reduction
    const canvas = p5.createCanvas(width,height);
    return canvas;
  }
}


