import { Injectable } from '@angular/core';

@Injectable()
export class MessageFaq {
    public role: string;
    public message: string;
    public mail: string;
    public username: string;
    

    constructor() {}

    setMessage(role: string, message: string, mail: string, username: string){
        this.role = role;
        this.message = message;
        this.mail = mail;
        this.username = username;
    }

  }