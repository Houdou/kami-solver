import * as createjs from 'createjs-module';

import { TPos, Kami, KamiCell, KamiColorPalette, KamiColor } from '../model/kami';

export class KamiDrawCell {
	constructor(public cell: KamiCell, public unitSize: number, public shape: createjs.Shape) {
	}

	public updateCell(): KamiDrawCell {
		this.shape.graphics.ss(1, 0, 1, 10, true).s('rgba(0, 0, 0, 0.4)').f(this.cell.color.color)
		.drawPolyStar(this.unitSize / 3, 0, this.unitSize * 2 / 3, 3, 0, 0)
		return this;
	}
}

export class KamiDraw {
	private stage: createjs.Stage;
	private cells: Map<number, KamiDrawCell>;

	public service: (any) => any;

	constructor(public canvas: HTMLCanvasElement, public unitSize: number, public kami: Kami) {
		this.stage = new createjs.Stage(canvas);
		this.stage.autoClear = true;
		createjs.Ticker.setFPS(60);
	}

	public static r3: number = Math.sqrt(3);

	public Init(): void {
		this.canvas.width = this.kami.xSize * this.unitSize;
		this.canvas.height = this.kami.ySize * this.unitSize / KamiDraw.r3 * 2;

		this.cells = new Map<number, KamiDrawCell>();
		this.kami.each((cell: KamiCell) => {
			let c = this.drawCell(cell);
			c.shape.on('click', (evt) => {
				// console.log(this.kami.graph);
				if(this.kami.currentColor != null && this.kami.currentColor != cell.color) {
					this.service({event: 'step', data: null});
					this.kami.graph.colorNode(cell.node, this.kami.currentColor);
					this.kami.initGraph();
					// console.log(`Merge node ${cell.node.index} using color ${this.kami.currentColor.index}`);
					this.service({event: 'graphchange', data: null});
				}
				if(this.kami.graph.nodes.length == 1) {
					console.log("WIN");
				}
				this.updateKami();
				this.stage.update();
			});
		});
		this.stage.update();
	}

	public reset(): void {
		this.stage.removeAllChildren();
		this.Init();
	}

	public updateKami(): KamiDraw {
		this.kami.each((cell) => {
			this.cells.get(cell.pos.toIndex()).updateCell();
		})

		return this;
	}

	public drawCell(cell: KamiCell, addToStage: boolean = true): KamiDrawCell {
		let t = new createjs.Shape();
		t.graphics.ss(1, 0, 1, 10, true).s('rgba(0, 0, 0, 0.4)').f(cell.color.color)
		.drawPolyStar(this.unitSize / 3, 0, this.unitSize * 2 / 3, 3, 0, 0);
		
		if(cell.pos.lr == 1)
			t.rotation = 180;
		t.x = (cell.pos.x + cell.pos.lr) * this.unitSize;
		t.y = (2 * cell.pos.y / KamiDraw.r3 + (cell.pos.x + cell.pos.lr) / KamiDraw.r3) * this.unitSize;

		let c = new KamiDrawCell(cell, this.unitSize, t);
		this.cells.set(cell.pos.toIndex(), c);
		if(addToStage)
			this.stage.addChild(t);
		return c;
	}

	public recolorCell(cell: KamiCell, color: KamiColor): KamiDraw {
		cell.color = color;
		this.cells.get(cell.pos.toIndex()).shape.graphics.clear()
			.ss(1, 0, 0, 10, true).s('rgba(0, 0, 0, 0.4)').f(color.color)
			.drawPolyStar(this.unitSize / 3, 0, this.unitSize * 2 / 3, 3, 0, 0);
		return this;
	}
}