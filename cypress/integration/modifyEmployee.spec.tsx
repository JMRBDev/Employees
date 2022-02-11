/// <reference types="cypress" />

describe('Edit employee data', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://dummy.restapiexample.com/api/v1/employees', { fixture: 'getAllEmployees.json' });
        cy.intercept('GET', 'http://dummy.restapiexample.com/api/v1/employee/4', { fixture: 'getEmployeeById.json' });
        cy.intercept('PUT', 'http://dummy.restapiexample.com/api/v1/update/4', { fixture: 'modifyEmployee.json' });
    });

    it('navigates to employee details', () => {
        cy.visit('http://localhost:3000');
        cy.contains('h3', 'Cedric').click();
        cy.get('h1').should('contain', 'Employee details');
    });

    it('fills the form', () => {
        cy.get('#field-2').clear().should('have.attr', 'aria-invalid');

        cy.get('#field-2').type(' Edited');
        cy.get('#field-3').clear().type('12345');
        cy.get('#field-4').clear().type('37');

        cy.get('main').should('not.contain', 'input[aria-invalid="true"]');
    });

    it('submits the form', () => {
        cy.contains('button', 'Submit').click();
    });
});