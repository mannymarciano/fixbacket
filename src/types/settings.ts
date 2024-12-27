export interface TimezoneOption {
  value: string;
  label: string;
  offset: number;
}

export interface TimeZone {
  timezone: string;
  country: string;
  countryCode: string;
  city: string;
  offset: number;
}