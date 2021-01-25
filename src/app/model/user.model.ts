import { Injectable } from '@angular/core';

@Injectable()
export class UserApp {
    public age: number;
    public email: string;
    public role : string;
    public ville : string;

    constructor() {}

    setUser(age: number, email: string, role: string, ville: string){
        this.age = age;
        this.email = email;
        this.role = role;
        this.ville = ville;
    }

  }