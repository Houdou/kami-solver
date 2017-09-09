export interface IListener {
	(...arg): void;
}

export interface IItem {
	event?: string;
	listener?: IListener;
	once?: boolean;
}

export interface IEvent {
	addListener(event: string, listener: IListener): IEvent;
	emit(event: string, ...a: any[]): boolean;
	getMaxListeners(): number;
	listenerCount(event: string): number;
	listeners(event: string): Array<IListener>;
	on(event: string, listener: IListener): IEvent;
	once(event: string, listner: IListener): IEvent;
	removeAllListeners(event: string): IEvent;
	removeListener(event: string, listener: IListener): IEvent;
	setMaxListeners(thressholds: number): IEvent;
}

export class Event implements IEvent {
	public static defaultMaxListeners: number = 10;

	protected _listeners: Array<IItem> = new Array<IItem>();
	private _maxListeners: number = null;

	public addListener(event: string, listener): IEvent {
		return this.on(event, listener);
	}
	public emit(event: string, ...a): boolean {
		let listenerAvailable = this.listenerCount(event) !== 0;
		let items = new Array<IItem>(...this._listeners).filter((item, index, arr) => {
			return item.event === event;
		});
		this._invokeListeners(items, ...a);
		this._listeners = items.filter(item => !item.once);
		return listenerAvailable;
	}
	public getMaxListeners(): number {
		return this._maxListeners === null ? Event.defaultMaxListeners : this._maxListeners;
	}
	public listenerCount(event: string): number {
		return new Array<IItem>(...this._listeners)
		.filter((item, index, arr) => {
			return item.event === event;
		}).length;
	}
	public listeners(event: string): Array<IListener> {
		return new Array<IItem>(...this._listeners)
		.filter((item, index, arr) => {
			return item.event === event;
		})
		.map(item => item.listener)
		.reverse();
	}
	public on(event: string, listener: IListener ): IEvent {
		this._register({event, listener, once: false});
		return this;
	}
	public once(event: string, listener: IListener ): IEvent {
	   this._register({event, listener, once: true});
	   return this;
	}
	public removeAllListeners(event: string): IEvent {
		this._listeners = new Array<IItem>(...this._listeners)
		.filter((item, index, arr) => {
			return item.event !== event;
		});
		return this;
	}
	public removeListener(event: string, listener: IListener): IEvent {
		this._listeners = new Array<IItem>(...this._listeners)
		.filter((item, index, arr) => {
			return !(item.event === event) || !(item.listener === listener);
		});
		return this;
	}
	public setMaxListeners(thresshold: number): IEvent {
		this._maxListeners = thresshold;
		return this;
	}

	private _matchingEvent(item: IItem, event: string): boolean {
		return item.event === event;
	}
	private _matchingEventAndListener(item: IItem, event: string, listener: IListener): boolean {
		return !(item.event === event) || !(item.listener === listener);
	}
	private _nonMatchingEvent(item: IItem, event: string): boolean {
		return item.event !== event;
	}
	private _invokeListeners(items: Array<IItem>, ...a): void {
		items.map(item => item.listener(...a));
	}
	private _register(item: IItem): void {
		if (!this._checkListenerLimitReached(item.event)) {
			this._listeners.push(item);
			return;
		}
		console.log("Listner Limit Reached");
		return ;
	}
	private _returnListenerLimit(): number {
		return this._maxListeners === null ? Event.defaultMaxListeners : this._maxListeners;
	}
	private _checkListenerLimitReached(event: string): boolean {
		return this.listenerCount(event) === this._returnListenerLimit();
	}
}