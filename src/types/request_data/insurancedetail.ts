export interface InsuranceRecord {
    _id: string;
    minValue: number;
    maxValue: number;
    amount: number;
    _createdAt: string;
    _updatedAt: string;
}

export interface InsuranceData {
    total: number;
    records: InsuranceRecord[];
}

export interface FetchInsuranceParams {
    sortKey: string;
    sortOrder: number;
    needCount: boolean;
}
