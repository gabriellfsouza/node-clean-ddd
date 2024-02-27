import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(private value: string = randomUUID()) {}
  // get id(){
  //   return this.value
  // }
  // static create (id?: string){
  //   return new UniqueEntityID(id ?? crypto.randomUUID())
  // }
}
