export interface ApiResponse<ResponseT = null> {
	success: boolean;
	data: ResponseT;
}
