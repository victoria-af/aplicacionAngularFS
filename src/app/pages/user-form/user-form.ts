import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {

    public userForm: FormGroup;
    private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      try {
        const response = await this.userService.createUser(this.userForm.value);
        await Swal.fire({
          title: '¡Guardado!',
          text: `El usuario ${response.first_name} ha sido creado con éxito.`,
          icon: 'success'
        });
        this.router.navigate(['/home']);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo crear el usuario.', 'error');
      }
    }
  }
}
