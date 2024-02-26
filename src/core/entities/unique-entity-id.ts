import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
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
  //   return new UniqueEntityId(id ?? crypto.randomUUID())
  // }
}
