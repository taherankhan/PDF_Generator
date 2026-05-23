export interface Attachment {
    image: string;
    name?: string;
    index?: number;
}

export interface Parcel {
    attachments?: Attachment[];
}

export interface ParcelData {
    parcel?: Parcel;
}

export interface DocumentImage {
    src: string;
    alt: string;
}

export interface ParcelPhotosProps {
    data: ParcelData;
    index?:number
}