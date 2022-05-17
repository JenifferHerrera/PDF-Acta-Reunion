export class Resume {
    profilePic: string;
    name: string;
    fecha: string;
    lugar: string;
    noActa: number;
    objetivo: string;
    horaInicial: string;
    horaFinal: string;
    socialProfile: string;
    antecedentes:string;
    experiences: Experience[] = [];
    educations: Education[] = [];
    desarrollos: Desarrollo[] = [];
    agendas: Agenda[] = [];
    infos: Antecedente[] = [];



    constructor() {
        this.experiences.push(new Experience());
        this.educations.push(new Education());
        this.infos.push(new Antecedente());
        this.agendas.push(new Agenda());
        this.desarrollos.push(new Desarrollo());


    }
}

export class Antecedente {
  employer: string;
  
}

export class Agenda {
  employer2: string;
}

export class Desarrollo {
  employer3: string;

}

export class Education {
  compromisoAccion: string;
  fechaEntrega: string;
  fechaAsignada: string;
  responsable: string;
}

export class Experience {
    nombre: string;
    entidadCargo: string;
    correo: string;
    telefonoExtension: string;
    firma: number;


}
