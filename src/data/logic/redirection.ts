import _ from "lodash";

import { User } from "../../domain/entities/User";
import { buildHepatitisData, nhwaAdminData } from "../../domain/models";
import { nhwaClerkData, nhwaManagerData, nhwaViewerData } from "../../domain/models/nhwa/NHWA";
import { MalariaData } from "../../domain/models/east_mediterranian_mal/Malaria.jsx";
import { ntdLeishKenyaData } from "../../domain/models/ntd_leish_kenya/NTDLeishKenya";
import { rabiesData, simpleRabiesData } from "../../domain/models/rabies/Rabies";
import { snakebiteData } from "../../domain/models/snakebite/Snakebite";
import { internationalData } from "../../domain/models/international/International";
import i18n from "../../locales";
import { goToDhis2Url } from "../../utils/utils";
import eastMalRepoHeader from "../../webapp/components/headers/east-mal-repo-header";
import nhwaHeader from "../../webapp/components/headers/nhwa-header";
import whoHeader from "../../webapp/components/headers/who-header";
import {
    HepatitisLandingPage,
    NHWALandingPage,
    NTDLeishKenyaLandingPage,
    RabiesLandingPage,
    SnakebiteLandingPage,
    InternationalLandingPage,
    MalariaLandingPage,
} from "../../webapp/pages";
import internationalHeader from "../../webapp/components/headers/international-header";
import { Config } from "../../domain/entities/Config";

//TODO: Ask if we need a simple snakebite data or not
const HEP_CASCADE_CURE_DATA_ENTRY = "OSHcVu6XSUL";
const HEP_POLICY_UPTAKE_DATA_ENTRY = "uMCylDhyzRr";

const NHWA_ADMINS = "EX00r2JNlQo";
const NHWA_DATA_CLERKS = "DWWxlpQi9M8";
const NHWA_DATA_MANAGERS = "xcDZeClzdse";
const NHWA_DATA_VIEWERS = "r7QSG6UcnDW";
const NHWA_GLOBAL_TEAM = "MVWS4lpbPo2";

const NTD_Leish_LandingPage_KEN = "aQt4ynXtBOS";

const NTD_SB = "JusJWdDa1LM";

export const NTD_NZD_admin = "foOXWD4beuA";
export const NTD_RAB_OIE = "pbZna7luFaM";
export const NTD_RAB_Estimates = "K7VPSVrAYeV";
export const NTD_RAB_WHO_Official = "Zr1fdsbkiAR";
export const NTD_RAB_WHO_RO = "pjwgXz3y70w";
export const SS_NTD_RAB_AggData_Entry = "Mg0TXhvvXJ4";
export const SS_NTD_RAB_AggData_View = "B6oADCiiW8v";

export const EFH_USER = "IdneucbQYRb";
export const DATA_MANAGEMENT_USER = "mh5Tx6MS9jn";

const WIDP_IT_TEAM = "UfhhwZK73Lg";

const MAL_EMRO = "FpQ7a5OylZH";

export interface Configuration {
    programme: string;
    title: string;
    description: string;
    userGroupIds: string[];
    page: any;
    header?: any;
    data?: any;
    icon: string;
}

export const buildAvailableConfigurations = (version: number, userGroupIds: string[]): Configuration[] => {
    const isNHWADataManager = shouldRedirect(userGroupIds, [NHWA_DATA_MANAGERS]);
    const isNHWAGlobalTeam = shouldRedirect(userGroupIds, [NHWA_GLOBAL_TEAM]);
    const isAdminUserGroup = shouldRedirect(userGroupIds, [WIDP_IT_TEAM]);

    return [
        {
            programme: "nhwa-admins",
            title: i18n.t("National Health Workforce Accounts Online Data Platform"),
            description: i18n.t("NHWA Admins"),
            userGroupIds: [NHWA_ADMINS],
            page: NHWALandingPage,
            header: nhwaHeader,
            data: nhwaAdminData(version),
            icon: "img/icon.png",
        },
        {
            programme: "nhwa-managers",
            title: i18n.t("National Health Workforce Accounts Online Data Platform"),
            description: i18n.t("NHWA Data Managers"),
            userGroupIds: [NHWA_DATA_MANAGERS],
            page: NHWALandingPage,
            header: nhwaHeader,
            data: !isAdminUserGroup && isNHWADataManager && isNHWAGlobalTeam ? nhwaAdminData(version) : nhwaManagerData(version),
            icon: "img/icon.png",
        },
        {
            programme: "nhwa-data-clerks",
            title: i18n.t("National Health Workforce Accounts Online Data Platform"),
            description: i18n.t("NHWA Data Clerks"),
            userGroupIds: [NHWA_DATA_CLERKS],
            page: NHWALandingPage,
            header: nhwaHeader,
            data: nhwaClerkData(version),
            icon: "img/icon.png",
        },
        {
            programme: "nhwa-managers-viewers",
            title: i18n.t("National Health Workforce Accounts Online Data Platform"),
            description: i18n.t("NHWA Data Viewers"),
            userGroupIds: [NHWA_DATA_VIEWERS],
            page: NHWALandingPage,
            header: nhwaHeader,
            data: nhwaViewerData(version),
            icon: "img/icon.png",
        },
        {
            programme: "hepatitis",
            title: i18n.t("Home page for the Global Reporting System for Hepatitis"),
            description: i18n.t("Hepatitis"),
            userGroupIds: [HEP_CASCADE_CURE_DATA_ENTRY, HEP_POLICY_UPTAKE_DATA_ENTRY],
            page: HepatitisLandingPage,
            header: whoHeader,
            data: buildHepatitisData(),
            icon: "img/hepatitis.png",
        },
        {
            programme: "rabies",
            title: i18n.t("WHO Rabies Webpage"),
            description: i18n.t("Rabies"),
            userGroupIds: [
                NTD_NZD_admin,
                NTD_RAB_Estimates,
                NTD_RAB_WHO_Official,
                NTD_RAB_WHO_RO,
                SS_NTD_RAB_AggData_Entry,
            ],
            page: RabiesLandingPage,
            header: whoHeader,
            data: rabiesData,
            icon: "img/rabies-dog.svg",
        },
        {
            programme: "rabies-no-data-entry",
            title: i18n.t("WHO Rabies Webpage"),
            description: i18n.t("Rabies (no data entry)"),
            userGroupIds: [NTD_RAB_OIE, SS_NTD_RAB_AggData_View],
            page: RabiesLandingPage,
            header: whoHeader,
            data: simpleRabiesData,
            icon: "img/rabies-dog.svg",
        },
        {
            programme: "snakebite",
            title: i18n.t("WHO Snakebite Webpage"),
            description: i18n.t("Snakebite"),
            userGroupIds: [NTD_SB],
            page: SnakebiteLandingPage,
            header: whoHeader,
            data: snakebiteData,
            icon: "img/snakebite-main.svg",
        },
        {
            programme: "ntd-leish-kenya",
            title: i18n.t("National Leishmaniasis Control Programme for Kenya"),
            description: i18n.t("Landing Page for MoH Kenya"),
            userGroupIds: [NTD_Leish_LandingPage_KEN],
            page: NTDLeishKenyaLandingPage,
            header: whoHeader,
            data: ntdLeishKenyaData,
            icon: "img/kenya.png",
        },
        {
            programme: "international-projects",
            title: i18n.t("International Projects"),
            description: i18n.t("Landing Page for International Projects"),
            userGroupIds: [EFH_USER, DATA_MANAGEMENT_USER],
            page: InternationalLandingPage,
            header: internationalHeader,
            data: internationalData,
            icon: "img/icon.png",
        },
        {
            programme: "east-mediterranian-mal-repo",
            title: i18n.t("Eastern Mediterranean regional malaria repository"),
            description: i18n.t("Eastern Mediterranean regional malaria repository"),
            userGroupIds: [MAL_EMRO],
            page: MalariaLandingPage,
            header: eastMalRepoHeader,
            data: MalariaData,
            icon: "img/east-mal-repo.png",
        },
    ];
};

const shouldRedirect = (actualIds: string[], expectedIds: string[]): boolean =>
    _.intersection(actualIds, expectedIds).length > 0;

export const handleRedirection = async (baseUrl: string, version: number, user: User, config: Config) => {
    const userGroupIds = user.userGroups.map(userGroup => userGroup.id);

    const isAdminUserGroup = shouldRedirect(userGroupIds, [WIDP_IT_TEAM]);
    const isNHWAAdmin = shouldRedirect(userGroupIds, [NHWA_ADMINS]);
    const isNHWAGlobalTeam = shouldRedirect(userGroupIds, [NHWA_GLOBAL_TEAM]);
    const isNHWADataManager = shouldRedirect(userGroupIds, [NHWA_DATA_MANAGERS]);

    const redirectToNHWAAdmin = !isAdminUserGroup && (isNHWAAdmin || (isNHWAGlobalTeam && isNHWADataManager));

    const availableConfiguration = buildAvailableConfigurations(version, userGroupIds);
    const configurations = availableConfiguration.filter(
        config => isAdminUserGroup || shouldRedirect(userGroupIds, config.userGroupIds)
    );
    const username = user.name;

    if (configurations.length > 0) {
        return { username, userGroupIds, configurations, redirectToNHWAAdmin };
    } else {
        const { defaultProgramme, fallbackUrl } = config;

        const fallbackConfig = defaultProgramme
            ? availableConfiguration.find(config => config.programme === defaultProgramme)
            : undefined;

        if (fallbackConfig) {
            return { username, userGroupIds, configurations: [fallbackConfig], redirectToNHWAAdmin };
        } else {
            goToDhis2Url(baseUrl, fallbackUrl);
            return null;
        }
    }
};
