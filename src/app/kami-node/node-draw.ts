import * as createjs from 'createjs-module';

import { TPos, Kami, KamiCell, KamiNode, KamiGraph, KamiColorPalette, KamiColor } from '../model/kami';

export class DrawNode {
	constructor(public node: KamiNode, public shape: createjs.Shape) {

	}
}

export class DrawLink {
	constructor(public nodeL: KamiNode, public nodeR: KamiNode, public shape: createjs.Shape) {

	}
}

export class NodeDraw {
	private stage: createjs.Stage;

	constructor(public canvas: HTMLCanvasElement, public unitSize: number = 64, public kami: Kami = null) {
		this.stage = new createjs.Stage(canvas);
		this.stage.autoClear = true;
		createjs.Ticker.setFPS(60);
	}

	public Init(): void {
		let bg = new createjs.Shape();
		bg.graphics.f('#EEEEEE').dr(0, 0, this.canvas.width, this.canvas.height);
		this.stage.addChild(bg);
		this.kami.graph.nodes.forEach((node) => {
			this.drawNode(node);
		});
		this.kami.graph.links.forEach((nodes) => {
			let [nodeL, nodeR] = nodes;
			this.drawLink(nodeL, nodeR);
		})
		this.stage.update();
	}

	public drawNode(node: KamiNode, addToStage: boolean = true): DrawNode {
		let c = new createjs.Shape();
		c.graphics.ss(2, 0, 1, 10, true).s('rgba(0, 0, 0, 0.4)').f(node.color.color).dc(0, 0, this.unitSize);
		let pos = node.center;
		console.log(node, pos);
		c.x = pos[0] * this.unitSize * 1.25;
		c.y = pos[1] * this.unitSize;
		c.scaleX = c.scaleY = (node.cells.length / 5) ** 0.2;

		if(addToStage)
			this.stage.addChild(c);

		return new DrawNode(node, c);
	}

	public drawLink(nodeL: KamiNode, nodeR: KamiNode, addToStage: boolean = true): DrawLink {
		let link = new createjs.Shape();
		let [x0, y0] = nodeL.center, [x1, y1] = nodeR.center;
		link.graphics.ss(6, 1, 1, 10, true).s('rgba(80, 80, 80, 1)')
			.mt(x0 * this.unitSize * 1.25, y0 * this.unitSize)
			.lt(x1 * this.unitSize * 1.25, y1 * this.unitSize);
		if(addToStage)
			this.stage.addChild(link);

		return new DrawLink(nodeL, nodeR, link);
	}
}