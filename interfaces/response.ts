export type TResponseCode = "NR20000" | "NR40036"|"NR40101"|"NR40362"|"NR42942"|"NR42943"|"NR40021"|"NR40012"|"NR40022"|"NR40023"|"NR40025"|"NR40026"|"NR40027"
export type TCode = 200 | 422 | 401 | 403 | 404 | 429 | 500
export type response =
{
  statusCode: TResponseCode,
  message: string,
}