export interface BasicDetailsProps {
    basicDetails: {
        firstName: string;
        lastName: string;
        phone: string;
        phoneCountry: string;
        companyName: string;
        email: string;
        lastLoginAt: string;
        addressLines?: Address[];
        apprtment?:string;
    };
}

export interface User {
    user: {
        name: string
        lastName: string
    }
    _id: string;
    firstName: string;
    lastName: string;
    phoneCountry: string;
    phone: string;
    email: string;
    image: string;
    active: boolean;
    companyName: string;
    _createdAt: string;
}

export interface Option {
    label: string;
    value?: string | null | undefined | number;
}

export interface Status {
    value: string;
    label?: string;
    title?: string
}

export type EditUserModalProps = {
    show: boolean;
    handleClose: () => void;
    handleUserUpdate: () => void;
    userDetails?: {
        _id?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
    } | null;
};

export interface Address {
    lat: string;
    long: string;
    locality: string;
    type: number;
    apartment: string;
    apprtment?:string;
    locationName: string;
    _id: string;
}

export interface Notification {
    pickupAndDelivery: boolean;
    fareAndNegotiation: boolean;
    driverAssigned: boolean;
}

export interface UserDetails {
    _id: string;
    isRegCompleted: boolean;
    phone: string;
    phoneCountry: string;
    active: boolean;
    userType: number;
    addressLines: Address[];
    _createdAt: string | unknown;
    _updatedAt: string;
    lastLoginAt: string;
    companyName: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    thumbnail: string;
    averageRating: {
        averageRating:number
    }
    notification: Notification;
    apprtment?:string
}

export interface Tab {
    name: string;
    content: JSX.Element;
    value: string;
}
