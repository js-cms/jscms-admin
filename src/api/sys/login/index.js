import { req } from "@/api/request";

export function AccountLogin (data) {
  console.log(data);
  return req.post("/api/login", data)
}
