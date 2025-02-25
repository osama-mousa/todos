/// <reference types="cypress" />

describe("Todo Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.clearLocalStorage();
  });

  it("should add new todo", () => {
    const todoText = "New Cypress Test Todo";

    cy.get('[data-testid="todo-input"]').type(todoText).type("{enter}");

    cy.get('[data-testid="todo-item"]')
      .should("have.length", 1)
      .first()
      .should("contain", todoText);
  });

  it("should complete todo", () => {
    cy.addTodo("Task to complete");

    cy.get('[data-testid="todo-checkbox"]').first().click({ force: true });

    cy.get('[data-testid="todo-item"]')
      .first()
      .should("have.class", "completed");
  });

  it("should delete todo", () => {
    cy.addTodo("Task to delete");

    cy.get('[data-testid="delete-button"]').first().click({ force: true });

    cy.get('[data-testid="todo-list"]').should("not.contain", "Task to delete");
  });

  it("should edit todo", () => {
    cy.addTodo("Original text");

    cy.get('[data-testid="todo-item"]').dblclick();
    cy.get('[data-testid="edit-input"]').clear().type("Updated text{enter}");

    cy.contains("Updated text").should("exist");
  });

  it("should persist todos after reload", () => {
    cy.addTodo("Persisted task");

    cy.reload();

    cy.get('[data-testid="todo-item"]').should("contain", "Persisted task");
  });

  it("should handle drag and drop", () => {
    cy.addTodo("First item");
    cy.addTodo("Second item");

    const dataTransfer = new DataTransfer();

    cy.get('[data-testid="todo-item"]')
      .first()
      .trigger("dragstart", { dataTransfer });

    cy.get('[data-testid="todo-item"]')
      .last()
      .trigger("drop", { dataTransfer });

    cy.get('[data-testid="todo-item"]')
      .first()
      .should("contain", "Second item");
  });
});
