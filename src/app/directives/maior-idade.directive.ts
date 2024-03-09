import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [{
    provide:NG_VALIDATORS, 
    useClass: MaiorIdadeDirective,
    multi: true
  }]
})
export class MaiorIdadeDirective implements Validator {

  constructor() {

  }

  validate(control: AbstractControl): ValidationErrors | null {
    const anoNascimento = new Date(control.value).getFullYear();
    const anoNascimentoMais18 = anoNascimento + 18;
    const anoAtual = new Date().getFullYear();
    const ehMaior = anoNascimentoMais18 <= anoAtual;
    return ehMaior ? null : { 'maiorIdadeValidator': true };
  }
}
