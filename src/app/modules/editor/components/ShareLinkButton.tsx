import { FC, useState } from "react";
import { toast } from "react-toastify";
import {
  buildShareUrl,
  SHARE_URL_LENGTH_WARN,
  type SharePayload,
} from "../../../../services/shareLinkService";

interface ShareLinkButtonProps {
  payload: SharePayload;
}

const ShareLinkButton: FC<ShareLinkButtonProps> = ({ payload }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = buildShareUrl(payload);
    if (url.length > SHARE_URL_LENGTH_WARN) {
      toast.warn(
        "Link is long; some older browsers may not open it. Consider shortening your content."
      );
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied! Anyone with this link can view and download the PDF.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <button
      type="button"
      className="btn-icon share-link-btn"
      onClick={handleCopyLink}
      title="Copy share link"
      aria-label="Copy share link"
    >
      {copied ? (
        <i className="bi bi-check-lg text-success" aria-hidden />
      ) : (
        <i className="bi bi-link-45deg" aria-hidden />
      )}
      <span className="share-link-label">{copied ? "Copied" : "Copy link"}</span>
    </button>
  );
};

export default ShareLinkButton;
