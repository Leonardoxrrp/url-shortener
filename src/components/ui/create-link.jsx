import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UrlState } from "@/context"
import { QRCode } from "react-qrcode-logo"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Error from "../error"
import { Card } from "./card"
import * as yup from "yup"
import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/use-fetch"
import { createUrl } from "@/db/apiUrls"
import { BeatLoader } from "react-spinners"

function CreateLink() {
  const { user } = UrlState()
  const navigate = useNavigate()
  const ref = useRef()
  const [searchParams, setSearchParams] = useSearchParams()

  const longLink = searchParams.get("createNew")

  const [errors, setErrors] = useState({})
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  })

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  })

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    })
  }

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id })

  useEffect(() => {
    if (error == null && data) {
      navigate(`/link/${data[0].id}`)
    }
  }, [error, data])

  const createNewLink = async () => {
    setErrors([])
    try {
      await schema.validate(formValues, { abortEarly: false })
      const canvas = ref.current.canvasRef.current
      const blob = await new Promise((resolve) => canvas.toBlob(resolve))

      await fnCreateUrl(blob)
    } catch (e) {
      const newErrors = {}

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message
      })
      setErrors(newErrors)
    }
  }
  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({})
      }}
    >
      <DialogTrigger>
        <Button variant="destructive">Create new link</Button>
      </DialogTrigger>
      <DialogContent className="sm:mx-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create new</DialogTitle>
        </DialogHeader>

        {formValues?.longUrl && (
          <QRCode
            value="https://reactjs.org/"
            ecLevel="M"
            size={150}
            quietZone={10}
            bgColor="#FFFFFF"
            fgColor="#0056b3"
            qrStyle="squares"
            ref={ref}
          />
        )}
        <Input
          value={formValues.title}
          id="title"
          placeholder="Short link's title"
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}

        <Input
          value={formValues.longUrl}
          id="longUrl"
          placeholder="Enter your looong URL"
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}

        <div className="flex items-center gap2">
          <Card className="p-2">leonardo.fyi</Card>
          <span className="p-1">/</span>
          <Input
            value={formValues.customUrl}
            id="customUrl"
            placeholder="Custom link (optional)"
            onChange={handleChange}
          />
        </div>
        {error && <Error message={error.message} />}

        <DialogFooter className="sm:justify-start">
          <Button
            disabled={loading}
            onClick={createNewLink}
            type="submit"
            variant="destructive"
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateLink
