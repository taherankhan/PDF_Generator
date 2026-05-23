// Type definitions
export interface Chat {
    _id: string;
    type: string;
    amount: string | null;
    message: string;
    createdAt: string;
    label: string;
    isRejected: boolean;
    messageType: number;
    offerType?: number;
    offerStatus?: number;
    overallAccepted?: boolean;
    overallRejected?: boolean;
    deliveryCancelled?: boolean;
    deliveryCancellationMessage?: string;
    paymentMessage?: string;
}

// API Response interfaces
export interface SenderDetails {
    reference: string;
    firstName: string;
    lastName: string;
    userType: number;
    accepted?: boolean;
}

export interface ReceiverDetails {
    reference: string;
    firstName: string;
    lastName: string;
    userType: number;
}

export interface ChatAPIResponse {
    senderDetails: SenderDetails;
    receiverDetails: ReceiverDetails;
    _id: string;
    chatGroupId: string;
    chatType: string;
    messageType: number;
    offerPrice?: number;
    offerId?: string;
    driverOffered?: boolean;
    offerType?: number;
    offerStatus?: number;
    offerRejected?: boolean;
    overallRejected?: boolean;
    overallAccepted?: boolean;
    paymentReceived?: boolean;
    message?: string;
    _createdAt: string;
    _updatedAt: string;
}

export interface ChatDetailsAPIResponse {
    chats: ChatAPIResponse[];
}

export interface Participant {
    user: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: number;
    type: number;
    unreadCount: number;
    messageType: number;
}

export interface ConversationData {
    _id: string;
    deliveryReference: string;
    participants: Participant[];
    lastMessage: {
        messageType: number;
        message: string | null;
        senderId: string;
        senderFirstName: string;
        senderLastName: string;
        _createdAt: string;
    };
    _createdAt: string;
    _updatedAt: string;
}

export interface Driver {
    driverId: string;
    driverName: string;
    chats: Chat[];
    conversationId: string;
}

export interface DriversData {
    [key: string]: Driver;
}

export interface ChatScreen2Props {
    deliveryId: string;
}
