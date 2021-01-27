import { Injectable } from '@angular/core';

@Injectable()
export class InfoCity {
    public ville: string;
    public information : string;
    public photo : string;

    constructor() {}

    setInfo(ville: string, information: string, photo: string){
        this.ville = ville;
        this.information= information;
        this.photo = photo;
    }
  }