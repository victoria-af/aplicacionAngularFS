import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iuser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  @Input ({ required: true}) user!:Iuser

  @Output() deleteUser = new EventEmitter<string>();

  onDeleteClick(): void{

    if (this.user._id){
      this.deleteUser.emit(this.user._id);
    }
  }}
