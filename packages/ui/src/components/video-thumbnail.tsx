import '../styles/polaris/video-thumbnail.css';

export interface VideoThumbnailProps {
  thumbnailUrl: string;
  onClick?: () => void;
  /** Seconds. Rendered as m:ss for the eye, spoken in words for the ear. */
  videoLength?: number;
  /** 0–100. Shows a resume bar across the foot of the poster. */
  videoProgress?: number;
  showVideoProgress?: boolean;
  accessibilityLabel?: string;
}

const clock = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${String(rest).padStart(2, '0')}`;
};

const spoken = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  const parts: string[] = [];
  if (minutes) parts.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);
  if (rest) parts.push(`${rest} second${rest === 1 ? '' : 's'}`);
  return parts.join(' ') || '0 seconds';
};

/**
 * VideoThumbnail — a video poster with a play affordance and duration.
 *
 * The duration is shown as `2:31` but announced as "2 minutes 31 seconds":
 * a screen reader reads the colon form as a time of day, which is not what it
 * means here.
 */
export function VideoThumbnail({
  thumbnailUrl,
  onClick,
  videoLength,
  videoProgress,
  showVideoProgress = false,
  accessibilityLabel,
}: VideoThumbnailProps) {
  const label =
    accessibilityLabel ??
    (videoLength === undefined ? 'Play video' : `Play video of length ${spoken(videoLength)}`);

  return (
    <div
      className="Polaris-VideoThumbnail__Thumbnail"
      style={{ backgroundImage: `url(${thumbnailUrl})` }}
    >
      <div className="Polaris-VideoThumbnail__ThumbnailContainer">
        <button
          type="button"
          className="Polaris-VideoThumbnail__PlayButton"
          onClick={onClick}
          aria-label={label}
        >
          <span className="Polaris-VideoThumbnail__PlayIcon" aria-hidden>
            &#9654;
          </span>
        </button>

        {videoLength === undefined ? null : (
          <p className="Polaris-VideoThumbnail__Timestamp">
            <span aria-hidden>{clock(videoLength)}</span>
            <span className="Polaris-Text--visuallyHidden">{spoken(videoLength)}</span>
          </p>
        )}

        {showVideoProgress && videoProgress !== undefined ? (
          <div
            className="Polaris-VideoThumbnail__Progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={videoProgress}
            aria-label="Video progress"
          >
            <progress
              className="Polaris-VideoThumbnail__ProgressBar"
              value={videoProgress}
              max={100}
            />
            <div
              className="Polaris-VideoThumbnail__Indicator"
              style={{ width: `${videoProgress}%` }}
            >
              <span className="Polaris-VideoThumbnail__Label">{videoProgress}%</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
