/// <reference types="cypress" />

describe("Completed Page Tests", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.addTodo("Test complete todo").completeTodo();
    cy.get('[data-testid="completed-link"]').click();
  });

  it("should display completed todos", () => {
    cy.get('[data-testid="completed-item"]')
      .should("have.length.at.least", 1)
      .first()
      .should("contain", "Test complete todo");
  });

  it("should restore todo", () => {
    cy.get('[data-testid="restore-button"]').first().click({ force: true });

    cy.get('[data-testid="completed-item"]').should(
      "not.contain",
      "Test complete todo"
    );
  });

  it("should clear all completed", () => {
    cy.get('[data-testid="clear-all-button"]').click({ force: true });

    cy.get('[data-testid="completed-item"]').should("have.length", 0);
  });
});
