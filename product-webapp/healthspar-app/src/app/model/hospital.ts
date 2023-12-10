import { City } from "./city";
import { Doctor } from "./doctor";
import { AskedQuestion } from "./questions";

export interface Hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalWebsite: string;
  hospitalEmail: string;
  hospitalPhoneNumber: string;
  hospitalRating: number;
  hospitalReviews: string[];
  hospitalAmenities: string;
  numberOfBeds: number;
  city: City;
  doctors: Doctor[];
  frequentlyAskedQuestion:AskedQuestion[];
  fileName?: string;
  fileType?: string;
  imageData?: Uint8Array;
}
