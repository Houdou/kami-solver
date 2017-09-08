import * as createjs from 'createjs-module';

import { TPos, KamiCell, KamiColorPalette } from '../model/kami';

export class KamiDrawCell {
	constructor(public cell: KamiCell, public shape: createjs.DisplayObject) {
	}
}

export class KamiDraw {
	private stage: createjs.Stage;
	private _palette : KamiColorPalette;
	public get palette() : KamiColorPalette {
		return this._palette;
	}
	public set palette(v : KamiColorPalette) {
		this._palette = v;
	}

	constructor(public canvas: HTMLCanvasElement, public unitSize: number) {
		this.stage = new createjs.Stage(canvas);
	}

	public Init(): void {
		let c = new KamiCell(new TPos(0, 0, 0), this.palette[0])
		this.drawCell(c);
	}

	public drawCell(cell: KamiCell, addInStage: boolean = true): KamiDrawCell {
		let t = new createjs.Shape();
		t.graphics.f('black').drawPolyStar(0, 0, this.unitSize, 3, 0, 0);
		t.regX = - this.unitSize/2
		t.rotation = 180
		this.stage.addChild(t);
		return new KamiDrawCell(cell, t);
	}
}