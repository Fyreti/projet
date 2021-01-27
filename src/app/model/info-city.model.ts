import { Injectable } from '@angular/core';

@Injectable()
export class InfoCity {
    public name: string;
    public information : string;
    public photo : string;

    constructor() {}

    setInfo(name: string, information: string, photo: string){
        this.name = name;
        this.information= information;
        this.photo = photo;
    }
  }