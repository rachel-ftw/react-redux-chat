import {Store} from '.'

export class ReduceStore extends Store {
  constructor(dispatcher) {
    super(dispatcher)
  }
  reduce(state, action) {
    throw new Error("Subclasses must implement reduce method of Flux ReduceStore")
  }
   
}