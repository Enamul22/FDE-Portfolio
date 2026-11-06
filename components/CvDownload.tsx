import { profile, validCvUrl, type Profile } from "@/content/profile";
export function CvDownload({
  settings = profile,
}: {
  settings?: Pick<Profile, "showCvDownload" | "cvUrl">;
}) {
  if (!settings.showCvDownload || !validCvUrl(settings.cvUrl)) return null;
  return (
    <a className="button outline" href={settings.cvUrl} download>
      Download CV
    </a>
  );
}
