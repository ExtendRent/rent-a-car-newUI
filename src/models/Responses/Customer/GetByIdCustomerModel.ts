export interface GetByIdCustomerModel {
  response: {
    id: number;
    drivingLicenseTypeId: number;
    phoneNumber: string;
    drivingLicenseNumber: string;
    drivingLicenseTypeEntityName: string;
    name: string;
    surname: string;
    emailAddress: string;
    userImageEntityImageUrl: string;
    deleted: boolean;
    authority: string;
    status: string;
    password:string;
    userImageEntityId: number,
  };
}
