import { Component, ViewChild, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';

import { Kami, KamiData, KamiCell, KamiNode, KamiColor, TPos } from '../model/kami';

import { KamiDraw } from './kami-draw';

import { KamiService } from '../services/kami.service';

@Component({
	selector: 'app-kami',
	templateUrl: './kami.component.html',
	styleUrls: ['./kami.component.css']
})
export class KamiComponent implements OnInit, AfterViewInit {
	@Input()
	private unitSize: number = 64;

	@ViewChild('canvas')
	private canvas: ElementRef;

	private kd: KamiDraw;

	public kami: Kami;

	constructor(private kamiService: KamiService) {
		this.kamiService.on('kamichange', (kami: Kami) => {
			this.kami = kami;
			this.kd = new KamiDraw(this.canvas.nativeElement, this.unitSize, this.kami);
			this.kd.Init();
		});
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		let data = KamiData.fromArray([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
			[0, 0, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
			[0, 0, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]);
		data = KamiData.fromArray([
			[2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			[1, 1, 1, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 0, 0, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3],
			[1, 1, 1, 1, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3],
			[3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2],
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
			[1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 0, 0, 1, 1, 1, 1, 3, 3, 3, 3, 3],
			[1, 1, 1, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3],
			[3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 3, 3, 3],
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 2, 2],
		]);
		let kami = new Kami(['#32B49E', '#DB5E29', '#D5C7A8', '#1E4147'], data);
		console.log(kami);
		this.kamiService.kami = kami;
	}

	public solve(Kami): Array<TPos> {
		let steps = [];

		return [];
	}

}
