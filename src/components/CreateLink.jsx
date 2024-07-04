/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UrlState } from "@/contexts/UrlContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { useRef, useState, useEffect } from "react";
import { z } from "zod";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { BeatLoader } from "react-spinners";
import { createUrl } from "@/db/apiUrls";
import { toast } from "sonner";
import { PUBLIC_BASE_URL } from "@/utils/envConfigs";

function CreateLink() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    longUrl: z
      .string()
      .url("Must be a valid URL")
      .min(1, "Long URL is required"),
    customUrl: z.string().optional(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error: apiError,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, {
    ...formValues,
    user_id: user.id,
  });

  useEffect(() => {
    if (apiError === null && data) {
      toast.success("Link created successfully!");
      navigate(`/link/${data[0].id}`);
    }
  }, [apiError, data]);

  const createNewLink = async () => {
    setErrors({});
    try {
      schema.parse(formValues);

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (err) {
      const newErrors = {};

      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          newErrors[error.path.join(".")] = error.message;
        });
      }

      setErrors(newErrors);
      toast.error("Some fields are invalid. Please check!");
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(isOpen) => {
        if (!isOpen) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          {formValues.longUrl && (
            <QRCode ref={ref} size={200} value={formValues.longUrl} />
          )}
        </div>

        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}

        <Input
          id="longUrl"
          placeholder="Enter Your Long URL"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}

        <div className="flex items-center gap-2">
          <Card className="p-2 w-full">{PUBLIC_BASE_URL}</Card> /
          <Input
            id="customUrl"
            placeholder="Custom URL (Optional)"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>
        {apiError && <Error message={apiError.message} />}

        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            onClick={createNewLink}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateLink;
