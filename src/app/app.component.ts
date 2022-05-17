import { Component } from '@angular/core';
import { Resume, Antecedente, Agenda, Desarrollo, Experience, Education} from './resume';
import { ScriptService } from './script.service';
declare let pdfMake: any ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  resume = new Resume();

///Campo selector Participantes
  degrees = ['Director', 'Analista', 'Estratega', 'Secretaria'];

  constructor(private scriptService: ScriptService) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.infos || this.resume.infos.length === 0) {
      this.resume.infos = [];
      this.resume.infos.push(new Antecedente());
    }
    if (!this.resume.agendas || this.resume.agendas.length === 0) {
      this.resume.agendas = [];
      this.resume.agendas.push(new Agenda());
    }
    if (!this.resume.desarrollos || this.resume.desarrollos.length === 0) {
      this.resume.desarrollos = [];
      this.resume.desarrollos.push(new Desarrollo());
    }
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }


    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  addAntecedente() {
    this.resume.infos.push(new Antecedente());
  }

  addAgenda() {
    this.resume.agendas.push(new Agenda());
  }
  addDesarrollo() {
    this.resume.desarrollos.push(new Desarrollo());
  }

  addExperience() {
    this.resume.experiences.push(new Experience());
  }

  addEducation() {
    this.resume.educations.push(new Education());
  }

///PDF
  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.resume = new Resume();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [

        [
          this.getProfilePicObject()
        ],

        ///INICIO PDF
        {
          text: 'ACTA DE REUNION',
          bold: true,
          fontSize: 18,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },

        {
          columns: [
            [{
              text: this.resume.name,
              style: 'name : ' + this.resume.name,
            },
            {
              text: this.resume.fecha,
              style: 'Fecha : ' + this.resume.fecha,
            },
            {
              text: 'Lugar : ' + this.resume.lugar,
            },
            {
              text: 'No. Acta : ' + this.resume.noActa,
            },
            {
              text: 'Objetivo : ' + this.resume.objetivo,
            },
            {
              text: 'Hora Inicial: ' + this.resume.horaInicial,
            },
            {
              text: 'Hora Final: ' + this.resume.horaFinal,
            },

            ]


          ]
        },

///CUERPO PDF
        {
          text: 'Antecedentes',
          style: 'header',
          fontSize: 15,
        },
        this.getAntecedenteObject(this.resume.infos),

        {
          text: 'Agenda',
          style: 'header',
          fontSize: 15,
        },
        this.getAgendaObject(this.resume.agendas),
        {
          text: 'Desarrollo',
          style: 'header',
          fontSize: 15,
        },
        this.getDesarrolloObject(this.resume.desarrollos),
        {
          text: 'COMPROMISOS',
          style: 'header',
          alignment: 'center',
          fontSize: 15,
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'PARTICIPANTES',
          style: 'header',
          alignment: 'center',
          fontSize: 15,
        },
        this.getExperienceObject(this.resume.experiences),

        {
          text: 'Rev. UPDI',
          style: 'sign'
        },
        {
          columns : [
              { qr: this.resume.fecha + ', Antecedentes: ' + this.resume.antecedentes, fit : 100 },
              {
              text: `(${this.resume.fecha})`,
              alignment: 'right',
              fontSize: 8,
              }
          ]
        }
      ],
      info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            alignment: 'center',
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }

///ANTECEDENTES
  getAntecedenteObject(infos:Antecedente[]) {

    const ant = [];

    infos.forEach(antecedente => {
      ant.push(
        [{
          columns: [
            [{
              text: antecedente.employer,
            }],

          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...ant
        ]
      }
    };
  }

///AGENDA
  getAgendaObject(agendas: Agenda[]) {

    const e = [];

    agendas.forEach(agenda => {
      e.push(
        [{
          columns: [
            [{
              text: agenda.employer2,
            }],

          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...e
        ]
      }
    };
  }

  ///DESARROLLO
  getDesarrolloObject(desarrollos: Desarrollo[]) {

    const exs = [];

    desarrollos.forEach(desarrollo => {
      exs.push(
        [{
          columns: [
            [{
              text: desarrollo.employer3,
            }],

          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  ///COMPROMISOS
  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ['*', '*', '*','*'],
        body: [
          [{
            text: 'Compromiso/Accion',
            style: 'tableHeader'
          },
          {
            text: 'Fecha Asignada',
            style: 'tableHeader'
          },
          {
            text: 'Fecha Entrega',
            style: 'tableHeader'
          },
          {
            text: 'Responsable',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ ed.compromisoAccion, ed.fechaAsignada, ed.fechaEntrega, ed.responsable];
          })
        ]
      }
    };
  }

  ///PARTICIPANTES
getExperienceObject(experiences: Experience[]) {

  return {
    table: {
      widths: ['*', '*', '*','*','*'],
      body: [
        [{
          text: 'Nombre',
          style: 'tableHeader'
        },
        {
          text: 'Entidad/Cargo',
          style: 'tableHeader'
        },
        {
          text: 'Correo',
          style: 'tableHeader'
        },
        {
          text: 'Telefono/extension',
          style: 'tableHeader'
        },
        {
          text: 'Firma',
          style: 'tableHeader'
        },
      ],
      ...experiences.map(ex => {
        return [ ex.nombre, ex.entidadCargo, ex.correo, ex.telefonoExtension, ex.firma ];
      })
      ]
    }
  };
}

///IMAGEN O LOGO
  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 80
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }




}
