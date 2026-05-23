export interface SupportQuery {
    _id: string;
    ticketNumber: string;
    subject: string;
    description: string;
    category: string;
    priority: string;
    status: string;
    chargingStationName: string;
    stationType: "charging" | "parking";
    generatedBy: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        userType: "host" | "user";
    };
    assignedTo?: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    _createdAt: string;
    _updatedAt: string;
    lastResponse?: {
        message: string;
        respondedBy: string;
        respondedAt: string;
    };
    attachments?: Array<{
        fileName: string;
        fileUrl: string;
        fileSize: number;
    }>;
}

export interface SupportQueryFilters {
    searchTerm?: string;
    startDate?: Date | null;
    endDate?: Date | null;
    status?: string;
    priority?: string;
    category?: string;
    userType?: string;
}

export interface SupportQueryResponse {
    records: SupportQuery[];
    total: number;
    page: number;
    limit: number;
}
