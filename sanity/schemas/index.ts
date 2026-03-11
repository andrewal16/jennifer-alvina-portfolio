import { contactInfoType } from "./contactInfo";
import { homePageType } from "./homePage";
import { projectType } from "./project";
import { siteSettingsType } from "./siteSettings";

export const schema = {
  types: [projectType, homePageType, contactInfoType, siteSettingsType],
};
