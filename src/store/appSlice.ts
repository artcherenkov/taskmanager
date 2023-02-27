import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { TTodoItem } from "../types";

interface AppState {
  todos: TTodoItem[];
  editingTaskId: string | null;
}

const initialState: AppState = {
  todos: [],
  editingTaskId: null,
};

export const counterSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TTodoItem[]>) => {
      state.todos = action.payload;
    },
    createTodo: (state, action: PayloadAction<TTodoItem>) => {
      state.todos = [...state.todos, action.payload];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = [...state.todos].filter((t) => t.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<TTodoItem>) => {
      const { id } = action.payload;
      const todoToEditIdx = state.todos.findIndex((t) => t.id === id);
      if (todoToEditIdx === -1) return;
      state.todos[todoToEditIdx] = action.payload;
    },
    setEditingTodoId: (state, action: PayloadAction<string | null>) => {
      state.editingTaskId = action.payload;
    },
  },
});

export const {
  setTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  setEditingTodoId,
} = counterSlice.actions;

export const selectTodos = (state: RootState) => state.todos;
export const selectEditingTodoId = (state: RootState) => state.editingTaskId;

export default counterSlice.reducer;
