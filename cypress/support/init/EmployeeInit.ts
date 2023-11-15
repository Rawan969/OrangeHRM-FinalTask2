import { EmployeePayload } from "../API/payload/employeePayload";
import GenericHelper from "../helpers/genericFunctions";

export const firstName: string = "ahmad";
export const lastName: string = "ali";
export const empId: any = `${GenericHelper.genericRandomString()}`;
export default class CandidateInit {
  static initEmployee(): EmployeePayload {
    return {
      empPicture: null,

      employeeId: empId,

      firstName: firstName,

      lastName: lastName,

      middleName: "",
    };
  }
 
}
