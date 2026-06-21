export interface check_code{
    email:string,
    code:number,
    is_Login:boolean,
}
export interface Reg{
    first_name: string,
    last_name:string,
    email:string,
    username:string,
    password?:string,
}