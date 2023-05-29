import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css']
})
export class AgregarEditarPersonaComponent implements OnInit {
  tipoDocumento: string[] = ['Tarjeta de identidad', 'Cedula de ciudadania', 'Otro documento'];
  form: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;
  sexo: string[] = ['Masculino', 'Femenino', 'Prefiero no decirlo'];

  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
    private fb: FormBuilder, private _personaService: PersonaService,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.maxDate = new Date();
    this.form = this.fb.group({
      tipoDocumento: [null, Validators.required],
      documento: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', Validators.required],
      telefono: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      sexo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    })
    this.id = data.id;
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar ';
      this.getPersona(id);
    }
  }

  getPersona(id: number) {
    this._personaService.getPersona(id).subscribe(data => {
      console.log(data.telefono)
      this.form.setValue({
        tipoDocumento: data.tipoDocumento,
        documento: data.documento,
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        sexo: data.sexo,
        correo: data.correo
      })
    })
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditPersona() {

    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value.telefono);
    const persona: Persona = {
      tipoDocumento: this.form.value.tipoDocumento,
      documento: this.form.value.documento,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      telefono: this.form.value.telefono,
      sexo: this.form.value.sexo,
      correo: this.form.value.correo,
    }

    this.loading = true;

    if (this.id == undefined) {

      // Es agregar
      this._personaService.addPersona(persona).subscribe(() => {
        this.mensajeExito('agregada');
      })

    } else {

      // Es editar
      this._personaService.updatePersona(this.id, persona).subscribe(data => {
        this.mensajeExito('actualizada');
      })
    }
  }

//////////////////////////////////////////////////////////////////////////////////////
  mensajeExito(operacion: string) {
    this._snackBar.open(`La persona fue ${operacion} con exito`, '', {
      duration: 3000
    });
  }

}