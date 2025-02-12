




export interface User{
    id:string,
    name:string,
    dob:string,
    city:string,
    secretKey:string,
    warehouseId:string
    joindDate: string

}



export interface Product{
    id:string,
    name:string,
    type:string,
    barcode:string,
    price:string,
    solde:string,
    supplier:string,
    image:string,
    stocks:[
        {
            id:string,
            name:string,
            quantity:string,
            localisation:{
                city:string ,
                latitude: string ,
                longitude: string },

        }
    ]
}