import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LandingPage() {
  const [longUrl, setLongUrl] = useState()
  const navigate = useNavigate()

  const handleShorten = (e) => {
    e.preventDefault()
    navigate(`auth?createNew=${longUrl}`)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        URL Shortener !
      </h2>
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4"
          type="url"
          placeholder="Enter your long URL !"
        />
        <Button className="h-full" variant="destructive" disabled={!longUrl}>
          Shorten !
        </Button>
      </form>
      <Accordion
        type="single"
        collapsible
        className="max-w-full w-96 sm:w-80 md:w-64 lg:w-96"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>How to use ?</AccordionTrigger>
          <AccordionContent>
            Simply insert any long URL you need to shorten
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LandingPage
