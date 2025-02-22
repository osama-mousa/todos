export const getTodos = () => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("todos")) || [];
    } catch (error) {
      console.error("Error loading todos:", error);
      return [];
    }
  }
  return [];
};

export const saveTodos = (todos) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  }
};
