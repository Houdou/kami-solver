import * as createjs from 'createjs-module';

import { TPos, Kami, KamiCell, KamiColorPalette, KamiColor } from '../model/kami';

export class KamiDrawCell {
	constructor(public cell: KamiCell, public shape: createjs.Shape) {
	}
}

export class KamiDraw {
	private stage: createjs.Stage;
	private cells: Map<number, KamiDrawCell>;

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
				console.log(cell);
				// this.recolorCell(cell, this.kami.palette.get(0));
				this.stage.update();
			});
		});
		this.stage.update();
	}

	public drawCell(cell: KamiCell, addToStage: boolean = true): KamiDrawCell {
		let t = new createjs.Shape();
		t.graphics.ss(1, 0, 1, 10, true).s('rgba(0, 0, 0, 0.4)').f(cell.color.color)
		.drawPolyStar(this.unitSize / 3, 0, this.unitSize * 2 / 3, 3, 0, 0);
		
		if(cell.pos.lr == 1)
			t.rotation = 180;
		t.x = (cell.pos.x + cell.pos.lr) * this.unitSize;
		t.y = (2 * cell.pos.y / KamiDraw.r3 + (cell.pos.x + cell.pos.lr) / KamiDraw.r3) * this.unitSize;

		let c = new KamiDrawCell(cell, t);
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