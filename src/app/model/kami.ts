export class TPos {
	constructor(public x: number, public y: number, public lr: number) {

	}

	public toIndex(): number {
		return this.x * 1001 + 2 * this.y + this.lr;
	}
}

export class KamiStep {
	constructor(public pos: TPos, public cIndex: number) {

	}
}

export class KamiColor {
	constructor(public index: number, public color: string) {

	}

	public static Default: KamiColor = new KamiColor(-1, '#F0F0F0');
}

export class KamiColorPalette {
	private _colors: Array<KamiColor> = [];
	constructor(...colors: string[]) {
		for(let i in colors) {
			this.createNewColor(colors[i]);
		}
	}

	public get(i: number): KamiColor {
		if(i < 0 || i >= this._colors.length) {
			console.warn('Invalid color index, fallback to default');
			return KamiColor.Default;
		}
		return this._colors[i];
	}

	public createNewColor(color: string): KamiColor {
		let c = new KamiColor(this._colors.length, color);
		this._colors.push(c);
		return c;
	}

	public clone(): KamiColorPalette {
		return new KamiColorPalette(...this._colors.map(kc => kc.color));
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
	private indexs: Map<number, KamiCell>;

	public palette: KamiColorPalette;

	constructor(public initPalette: string[] = [], public xSize: number = 10, public ySize: number = 14, public unitSize: number = 32) {
		this.palette = new KamiColorPalette(...initPalette);

		// Create all cells
		this.cells = new Array<KamiCell>();
		this.indexs = new Map<number, KamiCell>();
		for(let u = 0; u < xSize; u++) {
			for(let v = 0; v < 2 * ySize + 1; v++) {
				let c = new KamiCell(new TPos(u, (v - u) >> 1, (v + u % 2) % 2), KamiColor.Default);
				// if(!this.checkPosValid(c.pos))
				// 	console.log(c.pos);
				this.cells.push(c);
				this.indexs.set(c.pos.toIndex(), c);
			}
		}
	}

	public getCellAt(pos: TPos): KamiCell {
		return this.indexs.get(pos.toIndex());
	}

	public checkPosValid(pos: TPos): boolean {
		if(pos.x < 0 || pos.x >= this.xSize) return false;
		let verticalIndex = -pos.x + 2 * pos.y + pos.lr;
		let upper_bound = -pos.x + 2 * this.ySize + 1;
		if(verticalIndex < -pos.x || verticalIndex >= upper_bound) return false;
		return true;
	}

	public each(f: (cell: KamiCell) => any): Kami {
		this.cells.forEach(c => { f(c); });
		return this;
	}
}