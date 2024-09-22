import useFetch from "@/components/hooks/use-fetch"
import { storeClicks } from "@/db/apiClicks"
import { getLongUrl } from "@/db/apiUrls"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { BarLoader } from "react-spinners"

function RedirectLink() {
  const { id } = useParams()

  const { loading, data, fn } = useFetch(getLongUrl, id)

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  })

  useEffect(() => {
    fn()
  }, [])

  useEffect(() => {
    if (!loading && data) {
      fnStats()
    }
  }, [loading])

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="36d7b7" />
        <br />
        Redirecting...
      </>
    )
  }

  return null
}

export default RedirectLink
