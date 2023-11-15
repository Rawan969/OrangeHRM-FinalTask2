let vacancyName: string = "Vacancy";
export default class Candidate {
  static elements = {
    mainTable: () => cy.get(".oxd-table"),
    tableBody: () => cy.get(".oxd-table-body"),
    tableHeader: () =>
      cy.get(".oxd-table-header-cell.oxd-padding-cell.oxd-table-th"),
    BTN: () => cy.get('[type="button"]'),
    status: () => cy.get(".oxd-text.oxd-text--p.oxd-text--subtitle-2"),
    submit: () => cy.get(".oxd-button--secondary"),
  };
  static openCandidatePage() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates"
    );
  }
  ///Interview pass
  static makeInterviewPass() {
    this.elements
      .BTN()
      .contains(" Mark Interview Passed ")
      .click({ force: true });
    this.elements.submit().click();
  }
  static verifyInterviewPassStatus() {
    this.elements.status().should("contain", "Interview Passed");
  }
  static assertionPassBtn() {
    cy.get(".oxd-button--danger").should("contain", " Reject ");
    cy.get(".orangehrm-recruitment-actions > :nth-child(2)").should(
      "contain",
      " Schedule Interview "
    );
    cy.get(".orangehrm-recruitment-actions > :nth-child(3)").should(
      "contain",
      " Offer Job "
    );
  }
  static makeJobOffer() {
    this.elements.BTN().contains(" Offer Job ").click({ force: true });
    this.elements.submit().click();
  }
  static makeHire() {
    this.elements.BTN().contains(" Hire ").click({ force: true });
    this.elements.submit().click();
  }
  /////Interview failed
  static makeInterviewFail() {
    this.elements
      .BTN()
      .contains(" Mark Interview Failed ")
      .click({ force: true });
    this.elements.submit().click();
  }
  static verifyInterviewFailStatus() {
    this.elements.status().should("contain", "Interview Failed");
  }
  static assertionFailBtn() {
    cy.get(".oxd-button--danger").should("contain", " Reject ");
  }
  ///search candidate
  static openApplicationStage(name: any) {
    const dataToAssert = [{ key: vacancyName, value: name }];
    let columnCount: any;
    let shouldExit = true; // Flag to control function exit
    this.elements
      .mainTable()
      .find(".oxd-table-header-cell.oxd-padding-cell.oxd-table-th")
      .its("length")
      .then((count) => {
        columnCount = count;
      });
    const columnName = dataToAssert[0].key;
    let indexnum: any;
    this.elements.tableHeader().each((th, mindex) => {
      cy.wrap(th)
        .invoke("text")
        .then((text: any) => {
          indexnum = text.indexOf("AscendingDescending");
          if (indexnum != -1) {
            text = text.slice(0, indexnum);
          }
          if (text === columnName) {
            this.elements
              .tableBody()
              .find(".oxd-table-card")
              .each((th, index) => {
                cy.wrap(th).then(() => {
                  if (shouldExit == true) {
                    cy.get(`.oxd-table-card:eq(${index})`)
                      .find(
                        `.oxd-table-cell.oxd-padding-cell > div:eq(${mindex})`
                      )
                      .invoke("text")
                      .then((text: any) => {
                        if (text == dataToAssert[0].value) {
                          cy.get(`.oxd-table-card:eq(${index})`)
                            .find(
                              `.oxd-table-cell.oxd-padding-cell > div:eq(${mindex})`
                            )
                            .should("have.text", dataToAssert[0].value);
                          cy.get(`.oxd-table-card:eq(${index})`)
                            .find(
                              `.oxd-table-cell.oxd-padding-cell:eq(${
                                columnCount - 1
                              }) > .oxd-table-cell-actions > .oxd-icon-button.oxd-table-cell-action-space `
                            )
                            .eq(0)
                            .click({ force: true });
                          shouldExit = false; // Set the flag to true to exit the function
                        }
                      });
                  }
                });
              });
          }
        });
    });
  }
}
