export interface CarModel {
    id: number;
    licenseTypeSuitable: boolean;
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
    carImageEntityId: number;
    vehicleStatusEntityId: number;
    carModelEntityBrandEntityId: number;
    carModelEntityId: number;
    colorEntityId: number;
    fuelTypeEntityId: number;
    shiftTypeEntityId: number;
    carBodyTypeEntityId: number;
    expectedMinDrivingLicenseTypeId: number;
    vehicleStatusEntityName: string;
    expectedMinDrivingLicenseTypeName:string;
    carSegmentEntityId:number;
    imageEntityImageUrl:string;
    carSegmentEntityName:string;
}