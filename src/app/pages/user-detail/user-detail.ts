import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Iuser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {

  @Input() _id?: string;
  

  private userService = inject(UserService);

  public userDetail = signal<Iuser | null>(null);

  ngOnInit(): void {
    if (this._id) {

      this.userService.getUserById(this._id).subscribe({
        next: (response) => {

          this.userDetail.set(response);
          console.log('Datos del usuario recibidos:', response);
        },
        error: (err) => {
          console.error('Error al cargar los datos del usuario', err);

      
        }
      });
    }
  }

  deleteUser() {
      const user = this.userDetail();

      if (user) {
        Swal.fire({
          title: `¿Deseas Borrar al usuario ${user.first_name}?`,
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',

        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d'

      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Borrado. Llamariamos al servicio aqui.');
        }
      });
    }
  }
}

