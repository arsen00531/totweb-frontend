import { UserRoles } from "../../models/User";

type Payload = {
    role: string[]
}

export function parseJwt (token: string | null): TAccessUserPayload | TAccessCompanyPayload | null {
    if (token === null) {
        return null
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

export function isAccessCompanyPayload(payload: Payload): payload is TAccessCompanyPayload {
    return payload?.role.includes(UserRoles.Company);
}

export type TAccessUserPayload = {
    userId: number;
    email: string;
    role: UserRoles[];
};

export type TAccessCompanyPayload = {
    companyId: number;
    email: string;
    role: UserRoles[];
};