export const getTodos = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }
  return [];
};

export const saveTodos = (todos) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};
