// https://next-auth.js.org/configuration/nextjs#middleware
export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/outra-rota"] }