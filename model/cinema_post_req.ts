export interface MoviePostRequest {
    mid:    number;
    name:   string;
    year:   string;
    detail: string;
    star:   string;
    poster: string;
}

export interface PersonPostRequest {
    pid:          number;
    name:         string;
    information:  string;
    profileImage: string;
    age:          string;
}

export interface StarsPostRequest {
    sid:  number;
    pidS: number;
    midS: number;
}

export interface CreatorsPostRequest {
    cid:  number;
    midC: number;
    pidC: number;
}