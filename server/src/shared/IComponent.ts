
export interface IComponent
{
    componentID: number;
    componentName: string;
    componentDescription: string;
    componentMinimumQuantity: number;
    componentPrice: number;
    vendorID: number;
    vendorName?: string;
}