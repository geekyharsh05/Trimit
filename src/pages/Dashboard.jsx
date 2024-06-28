/* eslint-disable react-hooks/exhaustive-deps */
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import Error from "@/components/Error";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/contexts/UrlContext";
import { getClicksForUrls } from "@/db/apiClicks";
import LinkCard from "@/components/LinkCard";
import CreateLink from "@/components/CreateLink";
import useDebounce from "@/hooks/useDebounce";

const Dashboard = () => {
  const { user } = UrlState();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms debounce delay

  const {
    loading: loadingUrls,
    error: errorUrls,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    () => getClicksForUrls(urls?.map((url) => url.id)),
    [urls?.map((url) => url.id).join(",")]
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) {
      fnClicks();
    }
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {loadingUrls || loadingClicks ? (
        <BarLoader width={"100%"} color="#36d7b7" />
      ) : null}
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
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {errorUrls && <Error message={errorUrls.message} />}
      {filteredUrls?.map((url) => (
        <LinkCard key={url.id} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  );
};

export default Dashboard;
