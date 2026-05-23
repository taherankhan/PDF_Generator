export const PREF_TOKEN = 'bearerToken';
export const IS_INTRO = '/';
export const IS_LOGIN = 'Login';
// API BASE URL
export const BASE_URL = "https://dev.api.scoreboard.svg.imperoserver.in/";
// export const BASE_URL = "https://freckly-intervertebrally-von.ngrok-free.app/";
// export const BASE_URL = 'http://127.0.0.1:3000/';
// export const BASE_URL = 'https://api.hitch.square-root.ie/';
export const PAGE_LIMIT = 10;
export const MAX_LENGTH = 100;
// API TYPES
export const GET = 'GET';
export const GET_URL_PARAMS = 'GET_URL_PARAMS';
export const GET_ID_PARAMS = 'GET_ID_PARAMS';
export const GET_URL_ENCODED = 'GET_URL_ENCODED';
export const GET_URL_ID_PARAMS = 'GET_URL_ID_PARAMS';
export const POST = 'POST';
export const POST_ID_PARAMS = 'POST_ID_PARAMS';
export const POST_RAW = 'POST_RAW';
export const POST_FORM = 'POST_FORM';
export const POST_URL_ENCODED = 'POST_URL_ENCODED';
export const POST_URL_PARAMS = 'POST_URL_PARAMS';
export const POST_URL_ENCODED_ID_PARAMS = 'POST_URL_ENCODED_ID_PARAMS';
export const MULTI_PART_POST = 'MULTI_PART';
export const PATCH = 'PATCH';
export const PATCH_ID = 'PATCH_ID';
export const PATCH_FORM = 'PATCH_FORM';
export const PATCH_FORM_ID = 'PATCH_FORM_ID';
export const PATCH_URL_ENCODED = 'PATCH_URL_ENCODED';
export const PATCH_FORM_ID_URL_ENCODED = 'PATCH_FORM_ID_URL_ENCODED';
export const MULTI_PART_ID_POST = 'MULTI_PART';
export const MULTI_PART_ID_PATCH = 'MULTI_PART_PATCH';
export const DELETE = 'DELETE';
export const DELETE_URL_PARAMS = 'DELETE_URL_PARAMS';
export const DELETE_URL_ENCODED = 'DELETE_URL_ENCODED';
export const DELETE_ID_PARAMS = 'DELETE_ID_PARAMS';
//Response
export const ResponseFail = 400;
export const ResponseSuccess = 200;
export const AuthError = 401;
export const Maintenance = 503;
// Otp timer
export const OtpSeconds = 59;

//vehical type
export const Motorbike = 1;
export const Car = 2;
export const Van = 3;
export const FlatBedTruck = 4;
export const HGVS = 5;

//fual type
export const Petrol = 1;
export const Diesel = 2;
export const Electric = 3;

//delivery type
export const Pending = 1;
export const OnTheWay = 2;
export const Pickedup = 3;
export const OutForDelivery = 4;
export const Delivered = 5;
export const Cancelled = 6;