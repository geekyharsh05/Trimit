/* eslint-disable react-hooks/exhaustive-deps */
import LoadingSpinner from "@/components/LoadingSpinner";
import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectLinkPage = () => {
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
        <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Redirecting...
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              You are being redirected to the target URL.
            </p>
            <div className="mt-8 flex justify-center">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default RedirectLinkPage;
