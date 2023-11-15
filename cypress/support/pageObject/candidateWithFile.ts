let vacancyName:string="Vacancy";
class CandidateWithFile{
    static elements = {
        BTN: ()=> cy.get('[type="button"]'),
        editBtn:()=> cy.get('.oxd-switch-input'),
        FirstLastName: () => cy.get('.--name-grouped-field'),
        email: () => cy.get('.oxd-input.oxd-input'),
        uploadedFile: () => cy.get('input[type="file"]'),
        saveBtn: () => cy.get('.oxd-button'),
        resumefile: () => cy.get('.oxd-text.oxd-text--p.orangehrm-file-name'),
        mainTable: () => cy.get('.oxd-table'),
        tableBody: () => cy.get('.oxd-table-body'),
        tableHeader: () => cy.get('.oxd-table-header-cell.oxd-padding-cell.oxd-table-th'),
        saveShortlist:()=>cy.get('.oxd-button--secondary')
    }
    
    static editCandidateWithFile(filePath: string){
        this.elements.editBtn().click({force:true})
        this.elements.uploadedFile().selectFile(filePath,{force:true});
        this.elements.saveBtn().click({ force: true });
    }
    static clickShortlist(){
        this.elements.BTN().contains("Shortlist").click({ force: true });
        this.elements.saveShortlist().click();
        cy.wait(7000);
    }
    static clickScheduleInterview(){
       return this.elements.BTN().contains("Schedule Interview ").click({ force: true });
    } 

    static verifyFilesContent(downloadedFilePath:any,expectedDataFilePath:any){
        cy.readFile(downloadedFilePath).then((downloadedFileContent) => {
          cy.readFile(expectedDataFilePath).then((expectedData) => {
            cy.wrap(downloadedFileContent).should('eq', expectedData);
          });
        });   
    }
    static openApplicationStage(name: any) {

        const dataToAssert = [{ key:vacancyName, value: name }];
        let columnCount: any;
        let shouldExit = true; // Flag to control function exit
        this.elements.mainTable().find('.oxd-table-header-cell.oxd-padding-cell.oxd-table-th').its('length').then((count) => {
            columnCount = count;
        })
        const columnName = dataToAssert[0].key;
        let indexnum: any;
        this.elements.tableHeader().each((th, mindex) => {
            cy.wrap(th).invoke('text').then((text: any) => {
                indexnum = text.indexOf('AscendingDescending')
                if (indexnum != -1) {
                    text = text.slice(0, indexnum);
                }
                if (text === columnName) {
                    this.elements.tableBody().find(".oxd-table-card").each((th, index) => {
                        cy.wrap(th).then(() => {
                            if (shouldExit == true) {
                                cy.get(`.oxd-table-card:eq(${index})`).find(`.oxd-table-cell.oxd-padding-cell > div:eq(${mindex})`).invoke('text').then((text: any) => {
                                    if (text == dataToAssert[0].value) {
                                        cy.get(`.oxd-table-card:eq(${index})`).find(`.oxd-table-cell.oxd-padding-cell > div:eq(${mindex})`).should('have.text', dataToAssert[0].value)
                                        cy.get(`.oxd-table-card:eq(${index})`).find(`.oxd-table-cell.oxd-padding-cell:eq(${columnCount - 1}) > .oxd-table-cell-actions > .oxd-icon-button.oxd-table-cell-action-space `).eq(2).click({ force: true });
                                        shouldExit = false; // Set the flag to true to exit the function
                                    }
                                })
                            }
                        })
                    })
                }
            });
        });

    
}
}
export default CandidateWithFile;