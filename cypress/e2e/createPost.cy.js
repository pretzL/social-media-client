describe("Create Post", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.wait(1000);
    cy.get(".btn-close:visible").click();
    cy.wait(500);
    cy.get("button[data-auth='login']:visible").click();
    cy.wait(1000);
    cy.get("input[type='email']:visible")
      .should("exist")
      .type("testeroni@noroff.no");
    cy.get("input[type='password']:visible").should("exist").type("12345678");
    cy.get(".btn-success:visible").click();
    cy.wait(3500);
    cy.visit("/");
  });

  it("Can create a post", () => {
    cy.wait(1000);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(2000);
    cy.url().should("include", "post");
    cy.get("#postTitle").should("exist").type("Creating a post in Cypress");
    cy.get("#postTags").should("exist").type("Testing, Cypress, KillMePls");
    cy.get("#postMedia")
      .should("exist")
      .type(
        "https://cdn.discordapp.com/attachments/729294434491170856/1027146979110817802/brooke-lark-M4E7X3z80PQ-unsplash_700px-test.jpg"
      );
    cy.get("#postBody")
      .should("exist")
      .type(
        "I made this using Cypress so if anything went wrong, don't kill me"
      );
    cy.get('button[data-action="submit"]').click();
    cy.wait(5000);
    cy.url().should("include", "view=post&postId=");
    cy.wait(1000);
    cy.get('button[data-action="delete"]:visible').click();
    cy.wait(1000);
    cy.url().should("include", "/");
  });

  it("Throws error if auth key is missing", () => {
    cy.wait(1000);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(2000);
    cy.url().should("include", "post");
    cy.clearLocalStorage();
    cy.get("#postTitle").should("exist").type("Creating a post in Cypress");
    cy.get('button[data-action="submit"]').click();
    cy.wait(2000);
    cy.url().should("include", "/");
  });

  it("Cannot resolve an empty request", () => {
    cy.wait(1000);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(2000);
    cy.url().should("include", "post");
    cy.get('button[data-action="submit"]').click();
    cy.get("#postTitle:invalid")
      .invoke("prop", "validationMessage")
      .should("include", "Please fill out this field");
  });

  it("Will validate an incorrect URL, and return a message if it fails", () => {
    cy.wait(1000);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(1000);
    cy.url().should("include", "post");
    cy.get("#postTitle").should("exist").type("Creating a post in Cypress");
    cy.get("#postTags").should("exist").type("Testing, Cypress, KillMePls");
    cy.get("#postMedia")
      .should("exist")
      .type("This is a string, not a URL lol");
    cy.get("#postBody")
      .should("exist")
      .type(
        "I made this using Cypress so if anything went wrong, don't kill me"
      );
    cy.get('button[data-action="submit"]').click();
    cy.get("#postMedia:invalid")
      .invoke("prop", "validationMessage")
      .should("include", "Please enter a URL");
  });

  it("Requires a post title", () => {
    cy.wait(500);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(2000);
    cy.url().should("include", "post");
    cy.get("#postTags").should("exist").type("Testing, Cypress, KillMePls");
    cy.get("#postMedia")
      .should("exist")
      .type(
        "https://cdn.discordapp.com/attachments/729294434491170856/1027146979110817802/brooke-lark-M4E7X3z80PQ-unsplash_700px-test.jpg"
      );
    cy.get("#postBody")
      .should("exist")
      .type(
        "I made this using Cypress so if anything went wrong, don't kill me"
      );
    cy.get('button[data-action="submit"]').click();
    cy.get("#postTitle:invalid")
      .invoke("prop", "validationMessage")
      .should("include", "Please fill out this field");
  });
});
