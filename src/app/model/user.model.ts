import { Injectable } from '@angular/core';

@Injectable()
export class User {
    
    constructor(public age: number, public email: string, public role : string, public vile : string) {}
    
  }