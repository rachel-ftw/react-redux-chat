import {generate as id} from 'shortid'
import {ReduceStore, Dispatcher} from './flux'

const taskDispatcher = new Dispatcher

class TaskStore extends ReduceStore {
  getInitialState() {
    return {
      showComplete: true,
      tasks:[{
          id: id(),
          content: "have an adventure",
          complete: false,
        },{
          id: id(),
          content: "take dogs for a walk",
          complete: false,
        },{
          id: id(),
          content: "sometimes snug",
          complete: false,
        },{
          id: id(),
          content: "water plants",
          complete: true,
        }]
    }
  }
  reduce(state, action) {
    console.log('!!!', state, action)
    return state
  }
  getState() {
    return this.__state
  }
}

const taskStore = new TaskStore(taskDispatcher)