import {Store} from './Store'

export class ReduceStore extends Store {
  constructor(dispatcher) {
    super(dispatcher)
  }
  reduce(state, action) {
    throw new Error("Subclasses must implement reduce method of Flux ReduceStore")
  }
  __onDispatch(action) {
    const newState = this.reduce(this.__state, action)
    if(newState !== this.__state) {
      this.state = newState
      this.__emitChange()
    }
  }
}