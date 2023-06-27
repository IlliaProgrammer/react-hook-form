
export interface IAddress {
    country:string
    city:string
    street:string
    house:string
}

export interface IShppingField {
    email:string
    name:string
    address:IAddress
}

export interface IOption {
	value: string
	label: string
}
