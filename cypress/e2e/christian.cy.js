describe('Login Form Test', () => {
  it('should allow the user to log in with valid credentials', () => {
    cy.visit('http://127.0.0.1:5500/index.html');
    cy.get('.text-end button[data-auth="login"]').click(); // Finn riktig knapp for å åpne login-skjema
    cy.get('#loginEmail').type('christian@stud.noroff.no'); // Skriv inn gyldig brukernavn
    cy.get('#loginPassword').type('Christian1234'); // Skriv inn gyldig passord
    cy.get('#loginForm').submit(); // Bruk riktig ID for å sende inn spesifikt login-skjema

    cy.url().should('include', 'profile'); // Tilpass denne delen etter hva som skjer ved vellykket innlogging
  });

  it('should show an error message for invalid credentials', () => {
    cy.visit('http://127.0.0.1:5500/index.html');
    cy.get('.text-end button[data-auth="login"]').click(); // Finn riktig knapp for å åpne login-skjema
    cy.get('#loginEmail').type('christian@stud.noroff.no'); // Skriv inn gyldig brukernavn
    cy.get('#loginPassword').type('Christian1235'); // Skriv inn gyldig passord
    cy.get('#loginForm').submit(); // Bruk riktig ID for å sende inn spesifikt login-skjema

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Either your username was not found or your password is incorrect');
    });

  });
  it('should allow the user to log in and out with valid credentials', () => {
    cy.visit('http://127.0.0.1:5500/index.html');
    cy.get('.text-end button[data-auth="login"]').click(); // Finn riktig knapp for å åpne login-skjema
    cy.get('#loginEmail').type('christian@stud.noroff.no'); // Skriv inn gyldig brukernavn
    cy.get('#loginPassword').type('Christian1234'); // Skriv inn gyldig passord
    cy.get('#loginForm').submit(); // Bruk riktig ID for å sende inn spesifikt login-skjema

    cy.url().should('include', 'profile'); // Tilpass denne delen etter hva som skjer ved vellykket innlogging
    cy.get('.text-end button[data-auth="logout"]').click(); // Finn riktig knapp for å logge ut
  });

});