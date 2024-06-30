/* eslint-disable react/prop-types */
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { PUBLIC_BASE_URL } from "@/utils/envConfigs";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WhatsappIcon, TwitterIcon, FacebookIcon } from "react-share";

const SocialShareButton = ({ url, customUrl }) => {
  const shareUrl = `${PUBLIC_BASE_URL}/${customUrl ? customUrl : url.short_url}`;

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" aria-label="Share on Social Media">
            <Share2 />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* WhatsApp Share Button */}
          <DropdownMenuItem>
            <WhatsappShareButton
              url={shareUrl}
              title="Check out this link"
              separator=" - "
            >
              <Button
                variant="ghost"
                className="flex items-center w-full gap-2"
              >
                <WhatsappIcon size={30} round />
                <span>WhatsApp</span>
              </Button>
            </WhatsappShareButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Facebook Share Button */}
          <DropdownMenuItem>
            <FacebookShareButton url={shareUrl} quote="Check out this link">
              <Button
                variant="ghost"
                className="flex items-center w-full gap-2"
              >
                <FacebookIcon size={30} round />
                <span>Facebook</span>
              </Button>
            </FacebookShareButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Twitter Share Button */}
          <DropdownMenuItem>
            <TwitterShareButton url={shareUrl} title="Check out this link">
              <Button
                variant="ghost"
                className="flex items-center w-full gap-2"
              >
                <TwitterIcon size={30} round />
                <span>Twitter</span>
              </Button>
            </TwitterShareButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SocialShareButton;
