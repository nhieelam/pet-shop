export interface StatisticsResponse {
    data: StatisticsData;
    errorCode: number;
    message: string;
    status: number;
    success: boolean;
    timestamp: string;
  }

export interface StatisticsData {
    year: number;
    invoiceCount: number;
    totalAmount: number;
    totalRealAmount: number;
}
export interface statisticCustomerData {
    customerId: string;
    customerName: string;
    invoiceCount: number;
    totalAmount: number;
    totalRealAmount: number;
}