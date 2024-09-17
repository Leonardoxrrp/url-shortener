import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BeatLoader } from "react-spinners"
import Error from "./error"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import useFetch from "./hooks/use-fetch"
import { login } from "@/db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/context"

function Login() {
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const  [searchParams] = useSearchParams()
    const longLink = searchParams.get("createNew")

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

   const { data, loading, error, fn: fnLogin} = useFetch(login, formData)
   const { fetchUser } = UrlState()

   useEffect(() => {
    if (error === null && data) {
        fetchUser()
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
    }

   }, [error, data])

    const handleLogin = async () => {
        setErrors([])


        try {
            const schema = Yup.object().shape({
                email: Yup.string().email("invalid email").required("Email is required"),
                password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
            })

            await schema.validate(formData, {abortEarly: false})

            await fnLogin()
        } catch(e) {

            const newErrors = {}
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message
            })

            setErrors(newErrors)
        }
    }

  return (
    <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Card Description</CardDescription>
      {error && <Error message={error } /> }
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Input onChange={handleInputChange} name="email" type="email" placeholder="enter email" />
       {errors.email && <Error message={errors.email} />}
      </div>
      <div className="space-y-1">
        <Input onChange={handleInputChange} name="password" type="password" placeholder="enter password" />
        {errors.password && <Error message={errors.password} />}
        </div>
    </CardContent>
    <CardFooter>
      <Button onClick={handleLogin}>
        {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
      </Button>
    </CardFooter>
  </Card>
  
  )
}

export default Login