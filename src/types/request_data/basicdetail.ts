export interface VehicleMeasures {
    vehicleType: string;
    registrationNumber: string;
    model: {name: string};
    engineSize: string;
    fuelType: string;
    brand: {name: string};
    vehicleLoad: string;
}

export interface VehicleDetail {
    vehicleMeasures: VehicleMeasures;
}

export interface SpecialService {
    name: string;
}

export interface Certification {
    image?: string;
    name?: string;
    src?: string;
    alt?: string;
}

export interface BankDetails {
    bankName: string;
    holderName: string;
    Iban: string;
    swiftCode: string;
}

export interface BasicDetailsList {
    firstName: string;
    lastName: string;
    companyName: string;
    phoneCountry: string;
    phone: string;
    lastLoginAt: string;
    email: string;
    occupation: {name: string; type: number}[];
    routes: {locality: string}[];
    specialService: SpecialService[];
    bankDetails: BankDetails;
    vehicles: VehicleDetail[];
    certifications: Certification[];
}
