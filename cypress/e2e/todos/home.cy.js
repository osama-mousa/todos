describe("Home Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.clearLocalStorage();
  });

  it("Adds new todo", () => {
    cy.get('[data-testid="todo-input"]').type("Test Todo{enter}");
    cy.get('[data-testid="todo-list"]').should("contain", "Test Todo");
  });

  it("Toggles todo completion", () => {
    cy.addTodo("Test Todo");
    cy.get('[data-testid="todo-checkbox"]').first().click();
    cy.get('[data-testid="todo-item"]')
      .first()
      .should("have.class", "completed");
  });

  it("Deletes todo", () => {
    cy.addTodo("Test Todo");
    cy.get('[data-testid="delete-button"]').first().click();
    cy.get('[data-testid="todo-list"]').should("not.contain", "Test Todo");
  });

  it("Edits todo", () => {
    cy.addTodo("Original Text");
    cy.get('[data-testid="todo-text"]').first().dblclick();
    cy.get('[data-testid="edit-input"]').clear().type("Updated Text{enter}");
    cy.get('[data-testid="todo-text"]').should("contain", "Updated Text");
  });
});
