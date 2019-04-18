import { CoverageMap } from "istanbul-lib-coverage";

describe('Blog', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'cyp',
      name: 'cypress',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Log in to application')
  })

  it('user can login', function () {
    cy.get('input:first')
      .type('cyp')
    cy.get('input:last')
      .type('secret')
    cy.contains('login')
      .click()
    cy.contains('Hei')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('input:first')
        .type('cyp')
      cy.get('input:last')
        .type('secret')
      cy.contains('login')
        .click()
    })

    it('a new blog can be created', function () {
      cy.contains('create')
        .click()
      cy.get('#Title')
        .type('a blog created by cypress')
      cy.get('#Author')
        .type('cypress')
      cy.get('#Url')
        .type('www.cypress.com')
      cy.contains('Add new Blog')
        .click()
      cy.contains('a blog created by cypress')
    })

    it('it is possible to look at users', function () {
      cy.contains('users')
        .click()
      cy.contains('cyp')
      cy.contains('number of blogs')
    })

    it('it is possible to look at a user closely', function () {
      cy.contains('users')
        .click()
      cy.contains('cyp')
        .click()
      cy.contains('cypress')
      cy.contains('This user does not have any blogs')
    })

    describe('when there is a blog', function () {
      beforeEach(function () {
        cy.contains('create')
          .click()
        cy.get('#Title')
          .type('a blog created by cypress')
        cy.get('#Author')
          .type('cypress')
        cy.get('#Url')
          .type('www.cypress.com')
        cy.contains('Add new Blog')
          .click()
      })

      it('it is possible to look at a blog closely', function () {
        cy.contains('a blog created by cypress')
          .click()
        cy.contains('www.cypress.com')
      })

      it('it is possible to create a comment', function () {
        cy.contains('a blog created by cypress')
          .click()
        cy.contains('Add a new Comment')
        cy.get('input:first')
          .type('new comment')
        cy.contains('add')
          .click()
        cy.contains('new comment')
      })


    })
  })
})