import { Component, ViewChild, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';

import { Kami, KamiData, KamiCell, KamiNode, KamiColor, TPos } from '../model/kami';

import { NodeDraw } from './node-draw';

import { KamiService } from '../services/kami.service';

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

	constructor(private kamiService: KamiService) {
		this.kamiService.on('kamichange', (kami: Kami) => {
			this.kami = kami;
			if(this.nd) {
				this.nd.Init();
			} else {
				this.nd = new NodeDraw(this.canvas.nativeElement, this.unitSize, this.kami);
				this.nd.Init();
			}
		});
		this.kamiService.on('graphchange', (kami: Kami) => {
			// console.log(this.nd.kami.graph);
			this.nd.updateGraph();
		});
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		
	}

}
