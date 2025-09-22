import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Iuser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {

  @Input() _id?: string;
  

  private userService = inject(UserService);
  private router = inject(Router);
  public userDetail = signal<Iuser | null>(null);

  async ngOnInit(): Promise<void> {
    if (this._id) {
      try {
        const user = await this.userService.getUserById(this._id);
        this.userDetail.set(user);
      } catch (error) {
        console.error('Error al cargar los datos del usuario', error);
      }
    }
  }

  async deleteUser(): Promise<void> {
      const user = this.userDetail();

if (user && user._id) {
      const result = await Swal.fire({
        title: `¿Deseas Borrar al usuario ${user.first_name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        try {
          await this.userService.deleteUser(user._id);
          await Swal.fire('¡Borrado!', 'El usuario ha sido eliminado.', 'success');
          this.router.navigate(['/home']);
        } catch (error) {
          Swal.fire('Error', 'No se pudo borrar el usuario.', 'error');
            }
          };
        }
      }
    
  }
  
