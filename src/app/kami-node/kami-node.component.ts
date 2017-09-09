import { Component, ViewChild, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';

import { Kami, KamiData, KamiCell, KamiNode, KamiColor, TPos } from '../model/kami';

import { NodeDraw } from './node-draw';

@Component({
	selector: 'app-kami-node',
	templateUrl: './kami-node.component.html',
	styleUrls: ['./kami-node.component.css']
})
export class KamiNodeComponent implements OnInit, AfterViewInit {
	@Input()
	private unitSize: number = 64;

	@ViewChild('nodeCanvas')
	private canvas: ElementRef;

	private nd: NodeDraw;

	public kami: Kami;

	constructor() { }

	ngOnInit() {
	}

	ngAfterViewInit() {

	}

}
