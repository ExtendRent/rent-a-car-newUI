export interface AddShowRentalResponse {
  response: {
    customerResponse: {
      id: number;
      phoneNumber: string;
      drivingLicenseNumber: string;
      drivingLicenseTypeEntityName: string;
      name: string;
      surname: string;
      emailAddress: string;
      authorities: string[];
    };
    carResponse: {
      id: number;
      isLicenseTypeSuitable: boolean;
      carModelEntityBrandEntityName: string;
      carModelEntityName: string;
      colorEntityName: string;
      year: number;
      carBodyTypeEntityName: string;
      fuelTypeEntityName: string;
      shiftTypeEntityName: string;
      seat: number;
      luggage: number;
      details: string;
      rentalPrice: number;
      licensePlate: string;
      kilometer: number;
      imageEntityImageUrl: string;
      availabilityDate: Date;
      expectedMinDrivingLicenseTypeName: string;
      vehicleStatusEntityName: string;
    };
    startDate: Date;
    endDate: Date;
    discountCode: string;
    amount: number;
  };
}