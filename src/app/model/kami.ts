export class TPos {
	constructor(public x: number, public y: number, public lr: number) {

	}
}

export class KamiStep {
	constructor(public pos: TPos, public cIndex: number) {

	}
}

export class KamiColor {
	constructor(public index: number, public color: string) {

	}
}

export class KamiColorPalette {
	constructor(public colors: Array<KamiColor>) {

	}
}

export class KamiCell {
	private _lr : KamiCell;
	public get lr() : KamiCell {
		return this._lr;
	}
	public set lr(v : KamiCell) {
		this._lr = v;
	}


	private _up : KamiCell;
	public get up() : KamiCell {
		return this._up;
	}
	public set up(v : KamiCell) {
		this._up = v;
	}

	private _down : KamiCell;
	public get down() : KamiCell {
		return this._down;
	}
	public set down(v : KamiCell) {
		this._down = v;
	}

	constructor(public pos: TPos, public color: KamiColor) {

	}

}

export class KamiNode {
	public neib: Array<KamiNode>
	constructor(public color: KamiColor) {

	}
}

export class Kami {
	private cells: Array<KamiCell>;

	constructor(size, public unitSize: number = 32) {
		

	}
}