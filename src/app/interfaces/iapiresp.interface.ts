
import { Iuser } from "./iuser.interface";

export interface Iapiresp {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    results: Iuser[];
}
