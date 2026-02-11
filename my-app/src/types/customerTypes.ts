import type {UserResponse} from "./userTypes.ts";
import type {CartResponse} from "./cartTypes.ts";

export interface CustomerResponse {
    id: string;
    points: number;
    user: UserResponse;
    cart: CartResponse;
}