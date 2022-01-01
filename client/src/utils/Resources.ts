export interface ICallableFunction {
	(): void
}

export interface IDestroyable {
	task?: ReturnType<typeof setTimeout> | ICallableFunction,
	resource?: IDestroyable | ICallableFunction,
	destroy: ICallableFunction,
	apply?(arg0: undefined, args: []): void,
	job?: Promise<unknown>
}

export interface IMappedListener {
	[key: string]: ReturnType<typeof setTimeout>
}

export interface IMappedListenerArray {
	[key: string]: Array<IMappedListener>
}

export interface IObjectWithListeners {
	listeners: IMappedListener
}

export class Resources {
	resources: Array<IDestroyable>;
	debounces: IMappedListener;
	destroyed: boolean;

	constructor() {
		this.resources = [];
		this.debounces = {};
		this.destroyed = false;
	}

	/**
	 * Registers destroyable resource
	 */
	register(resource: IDestroyable | ICallableFunction): IDestroyable {
		let
			destroyable: IDestroyable;

		if (typeof resource === 'function') {
			destroyable = {
				resource: resource,
				destroy: function() {
					this.resource = () => {
						// empty fn
					};
				}
			};
		}
		else {
			destroyable = {
				resource: resource,
				destroy: function() {
					this.resource.destroy();
				}
			};
		}
		this.resources.push(destroyable);

		return destroyable;
	}

	/**
	 * Shorthand to get fn registered in a single call
	 */
	registerFn(fn: ICallableFunction, scope?: undefined): ICallableFunction {
		const
			destroyable: IDestroyable = this.register(fn);

		return function(...args) {
			return (destroyable.resource as ICallableFunction).apply(scope, args);
		};
	}

	/**
	 * Destroys resources
	 */
	destroy(): void {
		if (!this.destroyed) {
			this.free();
			delete this.resources;
			this.destroyed = true;
		}
	}

	/**
	 * Frees resources
	 */
	free(): void {
		let i, len, resource;

		for (i = 0, len = this.resources.length; i < len; i++) {
			resource = this.resources[i];
			resource.destroy();
		}
		this.resources = [];
	}

	/**
	 * Adds listeners
	 */
	listen(target: undefined | HTMLElement | Element, listeners, scope) {
		let eventName;

		for (eventName in listeners) {
			this._registerListener(target, eventName, listeners[eventName], scope);
		}
	}

	/**
	 * Defers function call
	 */
	defer(fn: ICallableFunction, delay = 0): IDestroyable {
		const
			destroyable: IDestroyable = {
				destroy: () => {/* will be replaced below */}
			},
			job: Promise<void> = new Promise(resolve => {
				fn = this.registerFn(fn);
				destroyable.task = setTimeout(() => {
					fn();
					resolve();
				}, delay);

				destroyable.destroy = function() {
					clearTimeout(this.task);
					resolve();
				};
			});

		destroyable.job = job;
		this.register(destroyable);
		return destroyable;
	}

	/**
	 * Calls a function in an interval
	 */
	tick(fn: ICallableFunction, interval: number): IDestroyable {
		const
			destroyable: IDestroyable = {
				destroy: () => {/* will be replaced below */}
			},
			job: Promise<void> = new Promise(resolve => {
				fn = this.registerFn(fn);

				destroyable.task = setInterval(() => {
					fn();
					resolve();
				}, interval);

				destroyable.destroy = function() {
					clearInterval(this.task);
					resolve();
				};
			});

		destroyable.job = job;
		this.register(destroyable);
		return destroyable;
	}

	/**
	 * Calls a function when there's no function call during a delay
	 */
	debounce(fn: ICallableFunction, delay: number): Promise<void> {
		fn = this.registerFn(fn);

		const
			fnKey = '' + fn,
			destroyable: IDestroyable = {
				destroy: () => {
					clearTimeout(this.debounces[fnKey]);
				}
			};

		if (this.debounces[fnKey]) {
			clearTimeout(this.debounces[fnKey]);
		}
		this.register(destroyable);

		return new Promise<void>(resolve => {
			this.debounces[fnKey] = setTimeout(() => {
				fn();
				resolve();
			}, delay);
		});
	}

	createSubmanager(): Resources {
		const
			resources = new Resources();

		this.register(resources);

		return resources;
	}

	/**
	 * Adds a listener
	 */
	_registerListener(
		target: EventTarget | IObjectWithListeners | IMappedListenerArray,
		eventName: string,
		fn: ICallableFunction,
		scope?: undefined
	): void {
		const
			listener: ICallableFunction = this.registerFn(fn, scope);

		if (target instanceof EventTarget) {
			target.addEventListener(eventName, listener);
			this.resources.push({
				destroy: function() {
					target.removeEventListener(eventName, listener);
				}
			});
		}
		else {
			if (!target.listeners) {
				target.listeners = {};
				this.resources.unshift({
					destroy: function() {
						delete target.listeners;
					}
				});
			}

			if (!target.listeners[eventName]) {
				target.listeners[eventName] = [];
			}
			target.listeners[eventName].push(listener);
		}
	}
}

export default Resources;
