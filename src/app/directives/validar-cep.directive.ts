import { ConsultaCepService } from './../service/consulta-cep.service';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Directive({
  selector: '[validadorCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS, 
    useClass: ValidarCepDirective,
    multi: true
  }]
})
export class ValidarCepDirective implements AsyncValidator {

  constructor(private consultarCepService: ConsultaCepService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {  
    const cep = control.value;

    return this.consultarCepService.getConsultaCep(cep).pipe(map(
      (resultado: any) => resultado.erro ? { 'validadorCep' : true } : null
    ));
  }
}
