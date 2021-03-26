export interface Payment {
    id?:number;
    carId:number;
    customerId:number;
    cartName:string;
    cartNumber:string;
    cartDate:string;
    cartCvv:number
    totalPrice:number;
    paymentDate:Date;
  }
  