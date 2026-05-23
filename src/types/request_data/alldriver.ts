export interface Driver {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneCountry: string;
    phone: string;
    image?: string;
    specialService: { name: string }[];
    occupation: { name: string }[];
    _createdAt: string;
    active: boolean;
    verified: number;
    name?: string;
    companyName?: string;
}
export interface TooltipState {
    [driverId: string]: {
        isVisible: boolean;
        position: { top: number; left: number };
        showMoreText: string;
    };
}

export interface TableOption {
    label: React.ReactNode;
    value: number;
}
export interface Status {
    value: string;
    label: string;
    title?: string
}
export interface Params {
    page?: number,
    pageLimit?: number,
    searchTerm?: string,
    startDate?: string,
    endDate?: string,
    status?: string | boolean
    pageNo?: number
    limit?: number,
    sortKey?: string,
    sortOrder?: number,
    needCount?: boolean,
}

export type EditDriverModalProps = {
    show: boolean;
    handleClose: () => void;
    handleDriverUpdate: any;
    driverDetails?: {
        _id: string;
        firstName?: string;
        lastName?: string;
        email?: string;
    } | null;
};