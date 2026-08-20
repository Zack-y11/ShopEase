export interface Role {
    id: string;
    name: string;
    image: string;
    route: string;
}

export interface UserResponse {
    email: string;
    id: number;
    image: string | null;
    lastName: string;
    name: string;
    notification_token: string | null;
    phone: string;
    roles: Role[];
}

export interface AuthResponse {
    token: string;
    userResponse: UserResponse;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    lastname: string;
    phone: string;
}