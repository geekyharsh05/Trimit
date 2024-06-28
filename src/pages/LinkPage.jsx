/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/contexts/UrlContext";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { PUBLIC_BASE_URL } from "@/utils/envConfigs";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader, ClipLoader, PuffLoader } from "react-spinners";
import { toast } from "sonner";
import { useState, useCallback } from "react";
import { Suspense, lazy } from "react";
const DeviceStats = lazy(() => import("@/components/DeviceStats"));
const Location = lazy(() => import("@/components/LocationStats"));

const LinkPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();

  const {
    loading: loadingUrl,
    data: url,
    fn: fetchUrl,
    error: urlError,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fetchStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: deleteUrlFn } = useFetch(deleteUrl, id);

  useEffect(() => {
    fetchUrl();
  }, []);

  useEffect(() => {
    if (!urlError && !loadingUrl) {
      fetchStats();
    }
  }, [loadingUrl, urlError]);

  useEffect(() => {
    if (urlError) {
      navigate("/dashboard");
    }
  }, [urlError]);

  const handleDownloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    document.body.removeChild(anchor);

    window.open(imageUrl, "_blank");

    toast.success("Image downloaded successfully");
  };

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleCopyUrl = () => {
    const link = url?.custom_url ? url.custom_url : url?.short_url;
    navigator.clipboard.writeText(`${PUBLIC_BASE_URL}/${link}`);
    toast.success("URL copied to clipboard");
  };

  const handleDeleteUrl = () => {
    deleteUrlFn().then(() => {
      toast.success("URL deleted successfully");
      navigate("/dashboard");
    });
  };

  const formattedDate = url ? new Date(url.created_at).toLocaleString() : "";

  const link = url ? (url.custom_url ? url.custom_url : url.short_url) : "";

  return (
    <>
      {(loadingUrl || loadingStats) && (
        <BarLoader className="mb-4" width="100%" color="#36d7b7" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`${PUBLIC_BASE_URL}/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            {PUBLIC_BASE_URL}/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {formattedDate}
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleCopyUrl}>
              <Copy />
            </Button>
            <Button variant="ghost" onClick={handleDownloadImage}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={handleDeleteUrl}
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <div className="relative w-full self-center sm:self-start">
            {!imageLoaded && (
              <div className="flex justify-center items-center w-full h-64 ring ring-blue-500 p-1">
                <ClipLoader color="#36d7b7" />
              </div>
            )}
            <img
              src={url?.qr}
              className={`w-full ring ring-blue-500 p-1 object-contain transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              alt="QR code"
              onLoad={handleImageLoad}
              onError={() => setImageLoaded(true)} // In case the image fails to load
            />
          </div>
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {loadingStats ? (
            <CardContent className="flex justify-center items-center h-64">
              <PuffLoader size={60} color="#36d7b7" />
            </CardContent>
          ) : stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats.length}</p>
                </CardContent>
              </Card>
              <CardTitle>Location Data</CardTitle>
              <Suspense fallback={<PuffLoader size={60} color="#36d7b7" />}>
                <Location stats={stats} />
              </Suspense>
              <CardTitle>Device Info</CardTitle>
              <Suspense fallback={<PuffLoader size={60} color="#36d7b7" />}>
                <DeviceStats stats={stats} />
              </Suspense>
            </CardContent>
          ) : (
            <CardContent>No Statistics yet</CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
