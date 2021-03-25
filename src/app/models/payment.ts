export interface Payment {
    id?:number;
    carId:number;
    customerId:number;
    cartName:string;
    cartNumber:string;
    cartDate:string;
    totalPrice:number;
    paymentDate:Date;
  }
  