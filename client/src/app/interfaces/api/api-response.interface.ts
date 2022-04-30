export interface ApiResponse<ResponseT> {
	success: boolean;
	data: ResponseT;
}
