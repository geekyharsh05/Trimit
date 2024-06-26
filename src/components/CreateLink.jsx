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

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const longUrl = searchParams.get("createNew");

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader >
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          <Input id="title" placeholder="Short Link's Title" />
          <Error message={"some error"} />
          <Input id="title" placeholder="Enter your Long URL" />
          <Error message={"some error"} />
          <div className="flex items-center gap-2">
            <Card className="p-2">trim.it</Card> /
            <Input id="title" placeholder="Custom URL (Optional)" />
          </div>
          <Error message={"some error"} />
          <DialogFooter className="sm:justify-center">
            <Button variant="destructive" className="w-full">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
