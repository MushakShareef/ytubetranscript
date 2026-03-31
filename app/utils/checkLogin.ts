export function checkLogin(router: any) {
  const user = localStorage.getItem("user")
  if (!user) {
    router.push("/login")
  }
}