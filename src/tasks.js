import {generate as id} from 'shortid'
import {ReduceStore, Dispatcher} from './flux'

const taskDispatcher = new Dispatcher()

const COMPLETE_TASK = `COMPLETE_TASK`
const CREATE_TASK = `CREATE_TASK`
const SHOW_TASK = `SHOW_TASK`

const createTaskAction = task => {
  return {
    type: CREATE_TASK,
    value: task
  }
}

const completeTaskAction = (id, isCompleted) => {
  return {
    type: COMPLETE_TASK,
    id,
    value: isCompleted
  }
}

const showTaskAction = show => {
  return {
    type: SHOW_TASK,
    value: show
  }
}

class TaskStore extends ReduceStore {
  getInitialState() {
    return {
      tasks: [{
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
        }],
      showComplete: true,
    }
  }

  reduce(state, action) {
    console.log('reducing...', state, action)
    let newState
    switch(action.type) {
      case CREATE_TASK:
        newState = { ... state, tasks: [... state.tasks]}
        newState.tasks.push({
          id: id(),
          content: action.value,
          complete: false
        })
        console.log('your new state..', newState)
        return newState
      case SHOW_TASK:
        newState = { ... state, 
          tasks: [... state.tasks], 
          showComplete: action.value}
        return newState
    }
    return state
  }

  getState() {
    return this.__state
  }
}

const taskStore = new TaskStore(taskDispatcher)

const TaskComponent = ({content, complete, id}) => (
  `<section>
    ${content} <input type="checkbox" name="taskCompleteCheck" data-taskid=${id} ${complete ? "checked" : ""}>
  </section>`
)

const render = () => {
    const taskSection = document.getElementById(`tasks`)
    const state = taskStore.getState()
    const rendered = taskStore.getState().tasks
      .filter(task => state.showComplete ? true : !task.complete)
      .map(TaskComponent).join("")
    taskSection.innerHTML = rendered
}

document.forms.newTask.addEventListener('submit', e => {
  e.preventDefault()
  const name = e.target.newTaskName.value
  if (name) {
    taskDispatcher.dispatch(createTaskAction(name))
    e.target.newTaskName.value = null
  }
})

document.getElementById('showComplete').addEventListener('change', ({target}) => {
  const showComplete = target.checked
  taskDispatcher.dispatch(showTaskAction(showComplete))
})


taskDispatcher.dispatch("dispatch that test. do it.")

taskStore.addListener(() => {
  render()
})

render()
