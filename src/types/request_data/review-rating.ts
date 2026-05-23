
export interface ReviewRatingProps {
    basicDetails: {
        userType: string;
    };
}

export interface ReviewRatingRecord {
    ratedAt: string; 
    ratedBy: {
        firstName: string;  
        lastName: string;   
    };
    ratedTo: {
        firstName: string;  
        lastName: string;   
    };
    rating: number;       
    review: string;      
}

export interface RatingResponse {
    records: ReviewRatingRecord[]; 
    total: number;                
}
