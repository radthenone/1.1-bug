import { AlertInterface, AlertOptionsInterface } from "./alerts.interface";

export enum AlertType {
	Success = 'Success',
	Error = 'Error',
	Info = 'Info',
	Warning = 'Warning'
}

export class Alert  implements AlertInterface {
    id?: string;
    type?: AlertType;
    message?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
    fade?: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export class AlertOptions implements AlertOptionsInterface {
	id?: string;
	autoClose?: boolean;
	keepAfterRouteChange?: boolean;
}