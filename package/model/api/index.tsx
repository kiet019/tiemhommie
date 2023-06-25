export interface ResponseBody<T> {
    data: T | null,
    status: string,
    message: string
}
