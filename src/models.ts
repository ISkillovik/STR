import { TfiYoutube } from "react-icons/tfi";
import { IoLogoInstagram, IoLocationSharp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { MdOutlinePhoneAndroid } from "react-icons/md";

export interface DataRacers {
  number: {
    carColor: string;
    carHp: string;
    carMark: string;
    carNum: string;
    group: string;
    motor: string;
    point: number;
    racerName: string;
  };
}

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export const TfiYoutubeIco = TfiYoutube as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

export const IoLogoInstagramIco = IoLogoInstagram as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

export const FaFacebookFIco = FaFacebookF as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

export const IoLocationSharpIco = IoLocationSharp as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

export const IoMdMailIco = IoMdMail as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

export const MdOutlinePhoneAndroidIco =
  MdOutlinePhoneAndroid as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
