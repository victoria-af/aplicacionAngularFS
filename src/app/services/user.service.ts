import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Iapiresp } from '../interfaces/iapiresp.interface';
import { Iuser } from '../interfaces/iuser.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);
  private baseURL :string = 'https://peticiones.online/api/users';

  getUsers(page = 1): Observable <Iapiresp> {
    return this.httpClient.get<Iapiresp>(`${this.baseURL}?page=${page}`);
  }
  
  getUserById(_id: string): Promise <Iuser> {
    return lastValueFrom(this.httpClient.get<Iuser>(`${this.baseURL}/${_id}`));
  }

  createUser(user: Iuser): Promise <Iuser> {
    return lastValueFrom(this.httpClient.post<Iuser>(this.baseURL, user));
  }

  updateUser(user: Iuser): Promise<Iuser> {
    const { _id, ...resto } = user;
    return lastValueFrom(this.httpClient.put<Iuser>(`${this.baseURL}/${_id}`, resto));
  }

  deleteUser(_id: string): Promise <unknown> {
    return lastValueFrom(this.httpClient.delete(`${this.baseURL}/${_id}`));
  }
}
