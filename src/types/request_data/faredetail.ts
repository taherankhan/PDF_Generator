export interface BasePricingByDistance {
    distanceBand: string;
    price: number;
    perKmRate?: number;
}

export interface WeightBasedSurcharge {
    category: string;
    surCharge: number;
    weightRange: string;
}

export interface VolumeAdjustment {
    volumeTiers: string;
    suggestedMultiplier: number;
    range?: string;
}

export interface FormData {
    basePricingByDistance: BasePricingByDistance[];
    weightBasedSurcharges: WeightBasedSurcharge[];
    volumeAdjustments: VolumeAdjustment[];
    hitchCommission: number;
    _id?: string
    spotLightAmount: number
}

export interface Validation {
    basePricingByDistance: boolean[];
    weightBasedSurcharges: boolean[];
    volumeAdjustments: boolean[];
    hitchCommission: boolean;
    spotLightAmount: boolean
}