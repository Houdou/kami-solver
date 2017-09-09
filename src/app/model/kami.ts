export class TPos {
	constructor(public x: number, public y: number, public lr: number) {

	}

	public toIndex(): number {
		return this.x * 1001 + 2 * this.y + this.lr;
	}

	public get up(): TPos {
		return new TPos(this.x, (this.y * 2 + this.lr - 1) >> 1, 1 - this.lr);
	}

	public get down(): TPos {
		return new TPos(this.x, (this.y * 2 + this.lr + 1) >> 1, 1 - this.lr);
	}

	public get leftOrRight(): TPos {
		if(this.lr == 0)
			return new TPos(this.x - 1, this.y, 1);
		else {
			return new TPos(this.x + 1, this.y, 0);
		}
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

	public nodeInited: boolean = false;
	public node: KamiNode;

	public get isUpBorder(): boolean {
		return this.up && (this.up.color.index != this.color.index);
	}
	public get isDownBorder(): boolean {
		return this.down && (this.down.color.index != this.color.index);
	}
	public get isLRBorder(): boolean {
		return this.lr && (this.lr.color.index != this.color.index);
	}
	public get isBorder(): boolean {
		return this.isUpBorder || this.isLRBorder || this.isLRBorder;
	}

	constructor(public pos: TPos, public color: KamiColor) {

	}

}

export class KamiData {
	constructor(public data: Map<number, number> = null, public xSize: number = 10, public ySize: number = 14) {
		
	}

	public static fromArray(arr: Array<Array<number>>): KamiData {
		let d = new KamiData();
		d.data = new Map<number, number>();
		d.xSize = arr.length;
		d.ySize = arr[0].length;
		for(let u = 0; u < arr.length; u++) {
			for(let v = 0; v < arr[u].length; v++) {
				d.data.set(u * 1000 + v, arr[u][v]);
			}
		}
		return d;
	}

	public getDataAt(pos: TPos): number {
		return this.data.get(pos.toIndex());
	}
}

export class KamiNode {
	public links: Array<KamiNode>;
	public cells: Array<KamiCell>;
	constructor(public index: number, public color: KamiColor) {
		this.cells = new Array<KamiCell>();
		this.links = new Array<KamiNode>();
	}

	public addLink(node: KamiNode): void {
		if(this.links.indexOf(node) == -1) {
			this.links.push(node);
		}
	}
}

export class KamiGraph {
	public nodes: Array<KamiNode>;

	constructor() {
		this.nodes = new Array<KamiNode>();
	}

	public createNode(color: KamiColor): KamiNode {
		let n = new KamiNode(this.nodes.length, color)
		this.nodes.push(n);
		return n;
	}
}

export class Kami {
	private cells: Array<KamiCell>;
	private indexs: Map<number, KamiCell>;

	private graph: KamiGraph;

	public palette: KamiColorPalette;

	constructor(public initPalette: string[] = [], public data: KamiData = null, public xSize: number = 10, public ySize: number = 14, public unitSize: number = 32) {
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

		this.each((cell) => {
			// Construct neibour links
			cell.lr = this.getCellAt(cell.pos.leftOrRight);
			cell.up = this.getCellAt(cell.pos.up);
			cell.down = this.getCellAt(cell.pos.down);
		});

		if(data != null) {
			this.data.data.forEach((color: number, index: number) => {
				this.indexs.get(index).color = this.palette.get(color);
			});
			this.graph = this.initGraph();
		}
	}

	public initGraph(): KamiGraph {
		let g = new KamiGraph();
		this.each((cell) => {
			if(cell.nodeInited) return;

			let toVisits = new Array<KamiCell>();
			toVisits.push(cell);
			let nodeColor = cell.color.index;
			let node = g.createNode(cell.color);
			while(toVisits.length > 0) {
				// debugger;
				let visit = toVisits.shift();
				if(!visit || visit.nodeInited || visit.color.index != nodeColor) continue;
				visit.nodeInited = true;
				visit.node = node;
				node.cells.push(visit);
				
				[visit.lr, visit.up, visit.down].forEach(c => {
					if(!c || c.nodeInited) return;
					toVisits.push(c);
				});
			}
			node.cells.forEach((c) => {
				if(c.isBorder) {
					if(c.isUpBorder)
						node.addLink(c.up.node);
					if(c.isDownBorder)
						node.addLink(c.down.node);
					if(c.isUpBorder)
						node.addLink(c.up.node);
				}
			})
			console.log(node);
		});

		return g;
	}

	public getCellAt(pos: TPos): KamiCell {
		let c = this.indexs.get(pos.toIndex());
		if(c)
			return c;
		else
			return null;
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