import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KamiComponent } from './kami/kami.component';
import { KamiNodeComponent } from './kami-node/kami-node.component';

import { KamiService } from './services/kami.service';

@NgModule({
	declarations: [
		AppComponent,
		KamiComponent,
		KamiNodeComponent
	],
	imports: [
		BrowserModule
	],
	providers: [
		KamiService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
