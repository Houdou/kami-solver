import { Injectable } from '@angular/core';

import { Kami, KamiGraph, KamiNode, KamiCell, KamiColor } from '../model/kami';

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
	}

	private _paint : KamiColor;
	public get paint() : KamiColor {
		return this._paint;
	}
	public set paint(v : KamiColor) {
		this._paint = v;
		this.emit('paintchange', this._paint);
	}

	constructor() {
		super();
	}
}
