import { Injectable } from '@angular/core';

@Injectable()
export class Event {
    public name: string;
    public information : string;
    public photo : string;
    public dateDebut : Date;
    public dateFin : Date;

    constructor() {}

    setEvent(name: string, information: string, photo: string, dateDebut: Date, dateFin: Date){
        this.name = name;
        this.information= information;
        this.photo = photo;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }
  }