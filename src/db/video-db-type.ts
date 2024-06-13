import {Resolutions} from "../input-output-types/video-types";

export interface VideoDBType {
    id: string;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolution: Resolutions[];
}