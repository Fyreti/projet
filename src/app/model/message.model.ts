import { Injectable } from '@angular/core';

@Injectable()
export class MessageApp {
    public role: string;
    public message: string;
    

    constructor() {}

    setMessage(role: string, message: string){
        this.role = role;
        this.message = message;
    }

  }