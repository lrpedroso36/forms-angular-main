import { ConsultaCepService } from './../service/consulta-cep.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router,
    private consultaCepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(['sucesso']);
    } else {
      alert('Formulário inválido.');
    }

    console.log(form.controls);
  }

  consultaCEP($event: any, formularioCadastro: NgForm): void {
    const cep = $event.target.value;

    if(cep === '' || cep === undefined)
      return;

    this.consultaCepService.getConsultaCep(cep).subscribe((resultado: any) => {
      this.populandoEndereco(resultado, formularioCadastro);
    });
  }

  populandoEndereco(resultado: any, formularioCadastro: NgForm) : void {
    formularioCadastro.form.patchValue({
      endereco: resultado.logradouro,
      complemento: resultado.complemento,
      bairro: resultado.bairro,
      cidade: resultado.localidade,
      estado: resultado.uf
    });
  };
}
