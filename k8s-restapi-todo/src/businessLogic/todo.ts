import { TodoItem } from '../controllers/v0/todo/models/TodoItem'
import { TodoAccess } from '../dataLayer/todosAccess'
import { parseUserId } from '../auth/utils'
import { TodoUpdate } from '../controllers/v0/todo/models/TodoUpdate'

const todoAccess = new TodoAccess()

export async function getUserTodos(jwtToken: any): Promise<TodoItem[]> {
  //Extract the UserId From the jwt Token
  const userId = parseUserId(jwtToken)
  //Return all the User's Todo Results 
  return await todoAccess.getUserTodos(userId)
}

export async function deleteUserTodos(todoId) {

  await todoAccess.deleteUserTodo(todoId)
}

// export async function attachTodoUrl(uploadUrl, todoId) {  
//   await todoAccess.attachTodoUrl(uploadUrl, todoId)
// }

export async function processImage(Key: string) {  
  await todoAccess.processTodoImage(Key)
  
  return await todoAccess.attachTodoUrl(Key) 

}

export async function createTodo(
  todo: TodoItem
): Promise<TodoItem> {
  return await todoAccess.createTodo(todo)
}


export async function updateUserTodo(
  todo: TodoUpdate,    
  todoId: string,
): Promise<TodoItem>{

  return await todoAccess.updateUserTodo(todo,todoId)
}

export function getUploadUrl(todoId: string): string {

  //Return the pre-signed Upload URL
  return todoAccess.getUploadUrl(todoId)

}