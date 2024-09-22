import { useNavigate, useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/components/login"
import Signup from "@/components/signup"
import { useEffect } from "react"
import { UrlState } from "@/context"

function Auth() {
  const { isAuthenticated, loading } = UrlState()
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const longLink = searchParams.get("createNew")

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
    }
  }, [isAuthenticated, loading])

  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {longLink ? "hold up ! Let's login first.." : "Login / signup"}{" "}
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth
