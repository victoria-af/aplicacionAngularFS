import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm implements OnInit {

    @Input() _id?: string;

    public formTitle: string = 'Nuevo Usuario';
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

  async ngOnInit(): Promise<void> {
  if (this._id) {
      this.formTitle = 'Actualizar Usuario';
      try {
        const userToUpdate = await this.userService.getUserById(this._id);
        this.userForm = new FormGroup({
          _id: new FormControl(userToUpdate._id),
          first_name: new FormControl(userToUpdate.first_name, [Validators.required]),
          last_name: new FormControl(userToUpdate.last_name, [Validators.required]),
          email: new FormControl(userToUpdate.email, [Validators.required, Validators.email]),
          image: new FormControl(userToUpdate.image, [Validators.required]),
        });
      } catch (error) {
        console.error('¡Error al cargar el usuario!', error);
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      try {
        let response;
        if (this.userForm.value._id) {
          response = await this.userService.updateUser(this.userForm.value);
        } else {
          response = await this.userService.createUser(this.userForm.value);
        }
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
