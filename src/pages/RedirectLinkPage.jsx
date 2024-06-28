/* eslint-disable react-hooks/exhaustive-deps */
import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        {/* <div className="flex flex-col items-center justify-center">
          <BarLoader width={"100%"} color="#36d7b7" />
          <br />
          <p className="text-lg text-gray-700 mt-4">
            Redirecting to your link...
          </p>
        </div> */}
        <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Redirecting...
            </h1>
            <p className="mt-4 text-muted-foreground">
              You are being redirected to the target URL.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default RedirectLink;
