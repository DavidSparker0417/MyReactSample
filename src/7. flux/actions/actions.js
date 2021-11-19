export const ADD_TODO = 'ADD_TODO';

let nextTodId = 0;

export function addTodo(text) {
    return {
        type: ADD_TODO,
        id: nextTodId ++,
        text
    };
}