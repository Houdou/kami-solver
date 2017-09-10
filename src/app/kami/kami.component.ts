import { Component, ViewChild, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';

import { Kami, KamiData, KamiCell, KamiNode, KamiColor, KamiColorPalette, TPos } from '../model/kami';

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

	private data: KamiData;
	public kami: Kami;

	public colors: KamiColor[] = new Array<KamiColor>();
	public colorSelected: KamiColor;

	public stepCount: number = 0;

	constructor(private kamiService: KamiService) {
		this.kamiService.on('kamichange', (kami: Kami) => {
			this.kami = kami;
			this.colorSelected = this.kamiService.paint = kami.palette.get(0);
			if(this.kd) {
				this.kd.Init();
			} else {
				this.kd = new KamiDraw(this.canvas.nativeElement, this.unitSize, this.kami);
				this.kd.service = (data: any) => {
					this.kamiService.emit(data.event, ...data.data);
				};
				this.kd.Init();
			}
		});
		this.kamiService.on('palettechange', (colors: Array<KamiColor>) => {
			setTimeout(() => {
				this.colors = colors.copyWithin(0, 0);
			}, 0);
		});
		this.kamiService.on('step', (step) => {
			setTimeout(() => {
				this.stepCount++;
			}, 0);
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
		], ['#32B49E', '#DB5E29', '#D5C7A8', '#1E4147']);
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
		], ['#32B49E', '#DB5E29', '#D5C7A8', '#1E4147']);
		this.data = data;
		let kami = new Kami(data);
		console.log(kami);
		this.kamiService.kami = kami;
	}

	public solve(Kami): Array<TPos> {
		let steps = [];

		return [];
	}

	public reset(): void {
		this.stepCount = 0;
		this.kamiService.kami.init();
		this.kamiService.emit('graphchange');
		this.kd.reset();
	}

	public useColor(color: KamiColor): void {
		this.colorSelected = color;
		this.kamiService.paint = color;
	}

}
