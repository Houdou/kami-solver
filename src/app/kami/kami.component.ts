import { Component, ViewChild, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';

import { Kami, KamiCell, KamiNode, KamiColor, TPos } from '../model/kami';

import { KamiDraw } from './kami-draw';

import * as createjs from 'createjs-module';

@Component({
	selector: 'app-kami',
	templateUrl: './kami.component.html',
	styleUrls: ['./kami.component.css']
})
export class KamiComponent implements OnInit, AfterViewInit {
	@Input()
	private unitSize: number = 32;

	@ViewChild('canvas')
	private canvas: ElementRef;

	private kd: KamiDraw;

	constructor() { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.kd = new KamiDraw(this.canvas.nativeElement, this.unitSize);
		this.kd.Init();
	}

	public solve(Kami): Array<TPos> {
		let steps = [];

		return [];
	}

}
