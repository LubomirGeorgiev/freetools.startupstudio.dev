import ChangelogPage from "@/components/changelog-page";
import { changelogData } from "./data";

export default function Changelog() {
  return <ChangelogPage changelogData={changelogData} />;
}
