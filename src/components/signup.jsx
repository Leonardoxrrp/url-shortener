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
import { signup } from "@/db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/context"

function Signup() {
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profile_pic: null
    })

    const navigate = useNavigate()
    const  [searchParams] = useSearchParams()
    const longLink = searchParams.get("createNew")

    const handleInputChange = (e) => {
        const {name, value, files } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: files? files[0] : value,
        }))
    }

   const { data, loading, error, fn: fnSignup} = useFetch(signup, formData)
   const { fetchUser } = UrlState()

   useEffect(() => {
    if (error === null && data) {
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
        fetchUser()
    }

   }, [error, loading])

    const handleSignup = async () => {
        setErrors([])


        try {
            const schema = Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email: Yup.string().email("invalid email").required("Email is required"),
                password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
                profile_pic: Yup.mixed().required("Profile picture is required")
            })

            await schema.validate(formData, {abortEarly: false})

            await fnSignup()
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
      <CardTitle>Signup</CardTitle>
      <CardDescription>Card Description</CardDescription>
      {error && <Error message={error } /> }
    </CardHeader>
    <CardContent className="space-y-2">
    <div className="space-y-1">
      <Input onChange={handleInputChange} name="name" type="text" placeholder="Enter name" />
       {errors.name && <Error message={errors.name} />}
      </div>
      <div className="space-y-1">
        <Input onChange={handleInputChange} name="email" type="email" placeholder="Enter email" />
       {errors.email && <Error message={errors.email} />}
      </div>
      <div className="space-y-1">
        <Input onChange={handleInputChange} name="password" type="password" placeholder="Enter password" />
        {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
        <Input onChange={handleInputChange} name="profile_pic" type="file" accept="image/*" />
        {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
    </CardContent>
    <CardFooter>
      <Button onClick={handleSignup}>
        {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Create account"}
      </Button>
    </CardFooter>
  </Card>
  
  )
}

export default Signup