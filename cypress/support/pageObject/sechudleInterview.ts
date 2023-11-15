class scheduleInterview {
    elements = {
        scheduleInterviewBtn: () => cy.get('.oxd-button--medium.oxd-button--success'),
        inputFields: () => cy.get('.oxd-input'),
        interviewerPicker: () => cy.get('[placeholder="Type for hints..."]'),
        interviewerOptions: () => cy.get('.oxd-autocomplete-dropdown'),
        monthPicker: () => cy.get('.oxd-calendar-selector-month-selected'),
        monthOptions: () => cy.get('.oxd-calendar-dropdown--option'),
        yearPicker: () => cy.get('.oxd-calendar-selector-year-selected'),
        yearOptions: () => cy.get('.oxd-calendar-dropdown--option'),
        dayPicker: () => cy.get('.oxd-calendar-dates-grid'),
        saveBtn: () => cy.get('.oxd-button--secondary.orangehrm-left-space'),
        status: () => cy.get('.oxd-text.oxd-text--p.oxd-text--subtitle-2'),
        BTN: ()=> cy.get('[type="button"]'),
        submit :()=>cy.get('[type="submit"]')
    }

    scheduleInterviewDetails() {
        cy.fixture('scheduleInterviewInfo').as('info')
        cy.get('@info').then((Interviewinfo: any) => {
            this.elements.scheduleInterviewBtn().click({ force: true })
            this.elements.inputFields().eq(5).type(Interviewinfo.interviewTitle)
            this.elements.interviewerPicker().type(Interviewinfo.interviewerPicker).invoke('show')
            this.elements.interviewerOptions().contains(Interviewinfo.interviewer).click();
            this.elements.inputFields().eq(6).click();
            this.elements.monthPicker().click();
            this.elements.monthOptions().contains(Interviewinfo.month).click();
            this.elements.yearPicker().click();
            this.elements.yearOptions().contains(Interviewinfo.year).click();
            this.elements.dayPicker().contains(Interviewinfo.day).click();
            this.elements.saveBtn().click()
        })
    }

}
export default scheduleInterview;