import Error from "@/components/error"
import useFetch from "@/components/hooks/use-fetch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateLink from "@/components/ui/create-link"
import { Input } from "@/components/ui/input"
import LinkCard from "@/components/ui/link-card"
import { UrlState } from "@/context"
import { getClicksForUrls } from "@/db/apiClicks"
import { getUrls } from "@/db/apiUrls"
import { Filter } from "lucide-react"
import { useEffect, useState } from "react"

import { BarLoader } from "react-spinners"

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const { user } = UrlState()
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id)
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id),
  )

  useEffect(() => {
    fnUrls()
  }, [])

  useEffect(() => {
    if (urls?.length) fnClicks()
  }, [urls?.length])

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length ? clicks?.length : 0}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1>My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          input={"text"}
          placeholder={"Filter links..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      })}
    </div>
  )
}

export default Dashboard
