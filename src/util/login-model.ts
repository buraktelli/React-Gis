export interface ILoginModel {
    success: boolean;
    token: string;
}
export interface IUserModel {
    username: string;
    password: string;
}

export interface ILoginErrorModel {
    success: boolean;
    message: string;
}