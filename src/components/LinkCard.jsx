/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

const LinkCard = ({ url = [], fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Remove the anchor from the document
    document.body.removeChild(anchor);

    // Open the downloaded image in a new tab
    window.open(imageUrl, "_blank");

    toast.success("Image downloaded successfully");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://trim.it/${url?.short_url}`);
    toast.success("URL copied to clipboard");
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);

  const handleDelete = () => {
    fnDelete()
      .then(() => {
        fetchUrls();
        toast.success("Link deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete link:", error);
        toast.error("Failed to delete link");
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qr}
        className="h-32 object-contain ring ring-blue-500 self-start"
        alt="qr code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          https://trim.it/
          {url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          <LinkIcon className="p-1" />
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={handleCopy}
          aria-label="Copy URL to clipboard"
        >
          <Copy />
        </Button>
        <Button
          variant="ghost"
          onClick={downloadImage}
          aria-label="Download Image"
        >
          <Download />
        </Button>
        <Button
          variant="ghost"
          onClick={handleDelete}
          disabled={loadingDelete}
          aria-label="Delete Link"
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
