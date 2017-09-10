import { Injectable } from '@angular/core';

import { Kami, KamiGraph, KamiNode, KamiCell, KamiColor, KamiColorPalette } from '../model/kami';

import { Event as LocalEmitter } from './event';

@Injectable()
export class KamiService extends LocalEmitter {
	private _kami : Kami;
	public get kami() : Kami {
		return this._kami;
	}
	public set kami(v : Kami) {
		this._kami = v;
		this.emit('kamichange', this._kami);
		this.emit('palettechange', this._kami.palette.getAllColors());
	}

	private _paint : KamiColor;
	public get paint() : KamiColor {
		return this._paint;
	}
	public set paint(v : KamiColor) {
		this._paint = v;
		this._kami.currentColor = v;
		this.emit('paintchange', this._paint);
	}

	constructor() {
		super();
	}
}
