export const TagTypeOptions = [
  {
    value: "Active",
    label: "Active",
    title: "Active",
  },
  {
    value: "InActive",
    label: "In Active",
    title: "In Active",
  },
];

export const inquiryStatus = [
  {
    value: 1,
    title: "New",
    label: "New",
  },
  {
    value: 2,
    title: "In Progress",
    label: "In Progress",
  },
  {
    value: 3,
    title: "Closed",
    label: "Closed",
  },
];

export const TypeOptions = [
  {
    value: 1,
    title: "Tail Lift",
    label: "Tail Lift",
  },
  {
    value: 2,
    title: "Ferry Boat",
    label: "Ferry Boat",
  },
  {
    value: 3,
    title: "Pharmacy Sector",
    label: "Pharmacy Sector",
  },
  {
    value: 4,
    title: "Veterinary Sector",
    label: "Veterinary Sector",
  },
  {
    value: 5,
    title: "Temperature Controlled",
    label: "Temperature Controlled",
  },
  {
    value: 6,
    title: "Compressed Gases",
    label: "Compressed Gases",
  },
  {
    value: 7,
    title: "Tow Truck",
    label: "Tow Truck",
  },
  {
    value: 8,
    title: "Other",
    label: "Other",
  }
];

export const DeliveryOptions = [
  {
    value: 1,
    title: "Pending",
    label: "Pending",
  },
  {
    value: 7,
    title: "Awaiting Pickup",
    label: "Awaiting Pickup",
  },
  {
    value: 2,
    title: "On The Way",
    label: "On The Way",
  },
  {
    value: 3,
    title: "Picked up",
    label: "Picked up",
  },
  {
    value: 4,
    title: "Out For Delivery",
    label: "Out For Delivery",
  },
  {
    value: 5,
    title: "Delivered",
    label: "Delivered",
  },
  {
    value: 6,
    title: "Cancelled",
    label: "Cancelled",
  },
];

export const WeightOptions = [
  {
    value: 1,
    title: "Light (0-50 Kg)",
    label: "Light (0-50 Kg)",
  },
  {
    value: 2,
    title: "Medium (51-150 Kg)",
    label: "Medium (51-150 Kg)",
  },
  {
    value: 3,
    title: "Heavy (151-500 Kg)",
    label: "Heavy (151-500 Kg)",
  },
  {
    value: 4,
    title: "Very Heavy (501-1000 Kg)",
    label: "Very Heavy (501-1000 Kg)",
  },
  {
    value: 5,
    title: "Oversize / Extreme (1001-10000 Kg)",
    label: "Oversize / Extreme (1001-10000 Kg)",
  },
];

export const SpotLightOptions = [
  {
    value: 'true',
    title: "True",
    label: "True",
  },
  {
    value: 'false',
    title: "False",
    label: "False",
  },
];

export const COLORS = {
  gray100: '#F9F9F9',
  gray200: '#F1F1F4',
  gray300: '#E5E7EB',
  gray500: '#99A1B7',
  gray600: '#78829D',
  gray700: '#4B5675',
  gray800: '#252F4A',
  white: '#FFFFFF',
  bgLight: '#F8F9FA',
  customer: '#4A90E2',
  driver: '#586E2D',
  danger: '#F8285A',
  warning: '#F6C000',
  deliveryCancelled: '#E44C4C'
};

export const OfferTypes = (function () {
  function OfferTypes() { }
  OfferTypes.InitialDriverOffer = 1;
  OfferTypes.CustomerCounter = 2;
  OfferTypes.DriverCounter = 3;

  return OfferTypes;
})();

export const OfferStatusTypes = (function () {
  function OfferStatusTypes() { }
  OfferStatusTypes.Pending = 1;
  OfferStatusTypes.Accepted = 2;
  OfferStatusTypes.Rejected = 3;
  OfferStatusTypes.Countered = 4;

  return OfferStatusTypes;
})();

// Support Query Status Options
export const SupportStatusOptions = [
  {
    value: "Open",
    title: "Open",
    label: "Open",
  },
  {
    value: "Closed",
    title: "Closed",
    label: "Closed",
  },
];

// Support Query Priority Options
export const SupportPriorityOptions = [
  {
    value: "Low",
    title: "Low",
    label: "Low",
  },
  {
    value: "Medium",
    title: "Medium",
    label: "Medium",
  },
  {
    value: "High",
    title: "High",
    label: "High",
  },
  {
    value: "Critical",
    title: "Critical",
    label: "Critical",
  },
];

// Support Query Categories
export const SupportCategoryOptions = [
  {
    value: "Booking Issues",
    title: "Booking Issues",
    label: "Booking Issues",
  },
  {
    value: "Payment & Refunds",
    title: "Payment & Refunds",
    label: "Payment & Refunds",
  },
  {
    value: "Charger Availability",
    title: "Charger Availability",
    label: "Charger Availability",
  },
  {
    value: "Parking Related",
    title: "Parking Related",
    label: "Parking Related",
  },
  {
    value: "Report A Problem",
    title: "Report A Problem",
    label: "Report A Problem",
  },
  {
    value: "Feedback & Suggestions",
    title: "Feedback & Suggestions",
    label: "Feedback & Suggestions",
  },
  {
    value: "Other",
    title: "Other",
    label: "Other",
  },
];

// Station Type Options
export const StationTypeOptions = [
  {
    value: "charging",
    title: "Charging Station",
    label: "Charging Station",
  },
  {
    value: "parking",
    title: "Parking Space",
    label: "Parking Space",
  },
];

// Parking Space Status Options
export const ParkingSpaceStatusOptions = [
  {
    value: "Active",
    title: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    title: "Inactive",
    label: "Inactive",
  },
];

// Parking Type Options
export const ParkingTypeOptions = [
  {
    value: "Paid",
    title: "Paid",
    label: "Paid",
  },
  {
    value: "Free",
    title: "Free",
    label: "Free",
  },
  {
    value: "Included with Charging",
    title: "Included with Charging",
    label: "Included with Charging",
  },
];

// QR Code Status Options
export const QRCodeStatusOptions = [
  {
    value: "Active",
    title: "Active",
    label: "Active",
  },
  {
    value: "Expired",
    title: "Expired",
    label: "Expired",
  },
  {
    value: "Not Generated",
    title: "Not Generated",
    label: "Not Generated",
  },
];

// Linked Charging Point Options
export const LinkedChargingPointOptions = [
  {
    value: "Yes",
    title: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    title: "No",
    label: "No",
  },
];

export const DiscountType = [
  {
    value: "Percentage",
    title: "Percentage",
    label: "Percentage",
  },
  {
    value: "Fixed",
    title: "Fixed",
    label: "Fixed",
  },
];

export const TransactionType=[
  {
    value:"Transferred",
    title:"Transferred",
    label:"Transferred",
  },
  {
    value:"Refunded",
    title:"Refunded",
    label:"Refunded",
  },
  {
    value:"Credited",
    title:"Credited",
    label:"Credited",
  }
]

export const PaymentStatus=[
  {
    value:"Pending",
    title:"Pending",
    label:"Pending",
  },
  {
    value:"Completed",
    title:"Completed",
    label:"Completed",
  },
  {
    value:"Failed",
    title:"Failed",
    label:"Failed",
  }
]