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

export interface User{
    first_name: string,
    last_name:string,
    email:string,
    username:string,
    fileUrl?: string
}

export interface UserF{
    id:number,
    first_name: string,
    last_name:string,
    email:string,
    username:string,
    password:string | null,
    fileUrl?: string | null
}