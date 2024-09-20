export class AlertInterface {
	id?: string;
	type?: string;
	message?: string;
	autoClose?: boolean;
	keepAfterRouteChange?: boolean;
	fade?: boolean;
}

export class AlertOptionsInterface {
	id?: string;
	autoClose?: boolean;
	keepAfterRouteChange?: boolean;
}