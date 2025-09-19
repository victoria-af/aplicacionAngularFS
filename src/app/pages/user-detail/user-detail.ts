import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Iuser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink, RouterModule,],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {

  @Input() _id?: string;
  

  private userService = inject(UserService);
  private router = inject(Router);
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

  deleteUser(): void {
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
this.userService.deleteUser(user._id!).subscribe({
            next: () => {
              Swal.fire(
                '¡Borrado!',
                'El usuario ha sido eliminado.',
              );
              this.router.navigate(['/home']); // Redirigimos al usuario a la home
            },
            error: (err) => {
              Swal.fire('Error', 'No se pudo borrar el usuario.', 'error');
              console.error(err);
            }
          });
        }
      });
    }
  }
}
