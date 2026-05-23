export interface AppSettingsFormData {
    androidVersion: string;
    iOSVersion: string;
    androidForceUpdate: boolean;
    iOSForceUpdate: boolean;
    iOSUnderMaintenance: boolean;
    androidUnderMaintenance: boolean;
    interface?:string
}

export interface ValidationState {
    androidVersion: boolean;
    iOSVersion: boolean;
}

export interface InterfaceOption {
    value: string;
    label: string;
    title: string;
}