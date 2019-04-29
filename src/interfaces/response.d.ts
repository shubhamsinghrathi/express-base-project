declare interface IResponse {
    success: boolean;
    statusCode: number;
    message: string;
    headerCode: number;
    result: any;
}

declare interface IResponseMessage {
    success: boolean;
    statusCode: number;
    message: string;
    headerCode: number;
}