export type PayloadType = {
    userId: number,
    email: string,
    artistId?: number
}

export type Enable2FAType = {
    secret:string,
}

export type ValidateTokenType = {
    token: string;
}