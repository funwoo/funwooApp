/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Referral {
  id: string;
  source_platform: string;
  listing_sid: string;
  time: number;
  source_type: string;
  visitor_id: string;
}

export interface UpdateReferralDto {
  id?: string;
  listing_sid?: string;
  time?: number;
  source_type?: string;
  visitor_id?: string;
}

export interface CreateLineVisitorDto {
  id: string;
  displayName: string;
  pictureUrl: string;
  ref: string;
}

export interface ReferralLine {
  id: string;
  listing_sid: string;
  time: number;
  source_type: string;
  visitor_id: string;
}

export interface Recipient {
  id: string;
}

export interface Sender {
  id: string;
}

export interface Messaging {
  recipient: Recipient;
  timestamp: number;
  sender: Sender;
  referral: Referral;
}

export interface Entry {
  id: string;
  time: number;
  messaging: Messaging[];
}

export interface CreateMetaWebhookDto {
  object?: string;
  entry: Entry[];
}

export enum CommonStatusEnum {
  Active = 'active',
  Inactive = 'inactive',
}

export interface ListingImage {
  status?: CommonStatusEnum;
  id: string;
  listing_id: string | null;
  google_drive_file_id: string | null;
  watermark_image: string | null;
  order: number | null;
  original_image: string | null;
  tag: string | null;
}

export interface AddVideoDto {
  listingId: string;
  order?: number;
  type?: string;
  url: string;
}

export interface ListingVideo {
  status?: CommonStatusEnum;
  id: string;
  video_url: string | null;
  type: string | null;
  order: number | null;
  listing_id: string | null;
}

export interface UploadToGoogle {
  originalImageResultURL: string;
}

export enum GoogleBucketEnum {
  Thumbnail = 'thumbnail',
  General = 'general',
  Template = 'template',
  Publication = 'publication',
  ListingPresentation = 'listing-presentation',
  SocialMedia = 'social-media',
}

export interface UploadToGoogleSpecificBucketDto {
  /** @format binary */
  file: File;
  bucket: GoogleBucketEnum;
  filename: string;
}

export interface Agent {
  pictures?: string[] | null;
  id: string;
  name: string | null;
  chinese_name: string | null;
  english_name: string | null;
  bio: string | null;
  email: string;
  contact_phone: string | null;
  contact_fb: string | null;
  contact_ig: string | null;
  contact_line: string | null;
  license: string | null;
  active: boolean | null;
  sid: string;
  group: string;
  qrcode_picture_line: string | null;
}

export interface UpdateAgentDto {
  pictures?: string[] | null;
  id: string;
  name?: string | null;
  chinese_name?: string | null;
  english_name?: string | null;
  bio?: string | null;
  email?: string;
  contact_phone?: string | null;
  contact_fb?: string | null;
  contact_ig?: string | null;
  contact_line?: string | null;
  license?: string | null;
  active?: boolean | null;
  sid?: string;
  group?: string;
  qrcode_picture_line?: string | null;
}

export interface CreateMailDto {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html: string;
}

export interface SendVerifyEmailDto {
  email: string;
}

export interface AuthIssueGoogleOauthEntity {
  authURL: string;
}

export interface GoogleAuthCallbackDto {
  code: string;
  scope: string;
  authuser: string;
  hd: string;
  prompt: string;
  redirect_url: string;
}

export interface BackyardUserEntity {
  role?: 'admin' | 'user';
  email: string | null;
  id_token: string | null;
  google_oauth: boolean;
  facebook_oauth: boolean;
  crm_id: string | null;
  id: string;
  active: boolean;
  name: string | null;
  image: string | null;
  crm_authToken: string | null;
}

export interface PasswordAuth {
  pwd: string;
  usr: string;
}

export interface VerifyEmailDto {
  code: string;
  email: string;
}

export enum CountryEnum {
  TW = 'TW',
  US = 'US',
}

export interface PaginationPagingDto {
  page: number;
  pageSize: number;
}

export interface SearchListingDto {
  country?: CountryEnum;
  cities?: string[];
  buildingType?: string[];
  deprioritizeSoldItem?: boolean;
  paging: PaginationPagingDto;
}

export enum ContractTypeEnum {
  UNIQUE = 'UNIQUE',
  COMMON = 'COMMON',
}

export interface ParkingDetailEntity {
  num: number;
  parking_space_type: string;
}

export interface TrafficEnvEntity {
  distance?: string;
  gType?: string;
  location: {coordinates?: number[]; lat?: number; lng?: number; type?: string};
  m?: number;
  name?: string;
  type?: string;
  walkTime?: string;
}

export enum ListingStatusEnum {
  Active = 'active',
  Inactive = 'inactive',
  Sold = 'sold',
}

export interface ListingState {
  id: string;
  listing_id: string;
  state: string;
  label: string | null;

  /** @format date-time */
  expire_at: string | null;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
}

export type Decimal = object;

export interface ListingDetail {
  contract_type?: ContractTypeEnum;
  parking_detail?: ParkingDetailEntity[] | null;
  traffic_env_school?: TrafficEnvEntity[] | null;
  traffic_env_hospital?: TrafficEnvEntity[] | null;
  traffic_env_supermarket?: TrafficEnvEntity[] | null;
  traffic_env_traffic?: TrafficEnvEntity[] | null;
  traffic_env_recreation?: TrafficEnvEntity[] | null;
  traffic_env_corporate?: TrafficEnvEntity[] | null;
  country?: CountryEnum;
  status?: ListingStatusEnum;
  feature_tags?: string[] | null;
  picture_tags?: string[] | null;
  raw_image_urls?: string[] | null;
  watermark_image_urls?: string[] | null;
  youtube_video_ids?: string[] | null;
  detail_sorting_categories?: string[] | null;
  house_available_time?: string[];
  listing_state: ListingState[];
  listing_image: ListingImage[];
  listing_video: ListingVideo[];
  id: string;
  sid: string;
  legacyid: string | null;
  address: string | null;
  agent1_id: string;
  agent2_id: string | null;
  bath: string | null;
  building_project: string | null;
  city: string | null;
  common_space: string | null;
  display_address: string | null;
  district: string | null;
  group: string;
  feature_content: string | null;
  price: number | null;
  room: string | null;
  title: string;
  detail_purpose: string | null;
  detail_category: string | null;
  detail_floor: string | null;
  detail_age: string | null;
  detail_total_area_size: string | null;
  detail_main_area_size: string | null;
  detail_other_area_size: string | null;
  detail_amenities_area: string | null;
  detail_lot_size: string | null;
  detail_parking: string | null;
  detail_balcony: string | null;
  detail_amenities: string | null;
  detail_management_fee: string | null;
  detail_land_category: string | null;
  detail_land_purpose: string | null;
  detail_land_size: string | null;
  detail_land_building: boolean | null;
  detail_guard_management: boolean | null;
  location_latitude: string | null;
  location_longitude: string | null;
  detail_parking_size: string | null;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  folderid: string | null;

  /** @format date-time */
  sold_at: string | null;

  /** @format date-time */
  close_at: string | null;
  floor: string | null;
  total_floor: string | null;
  floor_note: string | null;
  open_layout: boolean;
  is_parking_space_in_amenities: boolean;
  unit: string | null;
  sec: string | null;
  no: string | null;
  month_of_building_completion: number | null;
  year_of_building_completion: number | null;
  date_of_completion: string | null;
  display_building_project: boolean;
  zip_code: string | null;
  house_available_time_type: string | null;
  mortgage_amount: Decimal | null;
  owner_available_contact_time: string | null;
  owner_email: string | null;
  owner_has_mortgage: boolean | null;
  owner_house_viewing_way: string | null;
  owner_ideal_price: Decimal | null;
  owner_line: string | null;
  owner_name: string | null;
  owner_phone: string | null;
  owner_sell_reason: string | null;
}

export interface ListingPaginationEntity {
  payload: ListingDetail[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface ListingForBuy {
  listing: ListingDetail;
  agents: Agent[];
  agentLookup: Record<string, string>;
}

export interface PaginationSortDto {
  sort?: 'asc' | 'desc';
  field?: string;
}

export interface SearchListingByAddressDto {
  sorts?: PaginationSortDto[];
  keyword: string;
  paging: PaginationPagingDto;
}

export interface CreateListingFromCMADto {
  address: string;
  unit?: string;
  sec?: string;
  no?: string;
}

export interface CreateListingFromEmptyAddressDto {
  country?: 'TW' | 'US';
  address: string;
}

export interface CloneListingDto {
  listingId: string;
  targetId: string;
}

export interface MediaEntity {
  id: string;
  title: string;

  /** @format date-time */
  published_on: string | null;
  publisher: string | null;
  source: string;
  imageUrl: string;
  iconUrl: string | null;
  reporter: string | null;
  group: string | null;
  logoUrl: string;
}

export interface GetOptionsForBuy {
  buildingTypesData: string[];
  citiesData: string[];
}

export enum TEMPLATE_CATEGORY {
  ALL = 'ALL',
  LISTING_PRESENTATION = 'LISTING_PRESENTATION',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  ONE_PAGE_FLYER = 'ONE_PAGE_FLYER',
}

export interface TemplateReferenceEntity {
  type?: 'AGENT' | 'LISTING';
  refId: string;
}

export enum SCHEMA_TYPES {
  OPF = 'OPF',
  HOUSE = 'HOUSE',
  AGENT = 'AGENT',
}

export interface TemplatePageDataEntity {
  type?: 'image' | 'string';
  refSchemaType?: SCHEMA_TYPES;
  id: string;
  className?: string;
  locked: boolean;
  name: string;
  value: string;
  value_l?: string;
  refSchema?: string;
}

export interface BookPageEntity {
  reference?: TemplateReferenceEntity;

  /** @format date-time */
  created_at: string;
  created_by: string;
  data: TemplatePageDataEntity[];
  id: string;
  label: string;
  templateId: string | null;
  templateName: string | null;
  templateThumb: string | null;

  /** @format date-time */
  updated_at: string;
}

export interface Book {
  type?: TEMPLATE_CATEGORY;
  pages?: BookPageEntity[] | null;
  title: string | null;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  id: string;
  created_by: string | null;
  cover: string | null;
}

export interface CreateBookDto {
  type?: TEMPLATE_CATEGORY;
}

export interface UpdateBookTitleDto {
  title: string;
  bookId: string;
}

export interface UpdateBookPageDataDto {
  type?: 'image' | 'string';
  refSchemaType?: SCHEMA_TYPES;
  id?: string;
  className?: string;
  locked?: boolean;
  name?: string;
  value?: string;
  value_l?: string;
  refSchema?: string;
}

export interface UpdateBookPageDto {
  data?: UpdateBookPageDataDto;
  bookId: string;
  pageId: string;
  thumb?: string;
}

export interface BookPageDataEntity {
  type?: 'image' | 'string';
  refSchemaType?: SCHEMA_TYPES;
  id: string;
  className?: string;
  locked: boolean;
  name: string;
  value: string;
  value_l?: string;
  refSchema?: string;
}

export interface UpdateWholeBookPageDto {
  data?: BookPageDataEntity[];
  bookId: string;
  pageId: string;
  thumb?: string;
}

export interface UpdateBookPageReferenceDto {
  bookId: string;
  pageId: string;
  reference: TemplateReferenceEntity;
}

export interface ResetBookPageDto {
  type?: TEMPLATE_CATEGORY;
  bookId: string;
  pageId: string;
}

export interface TemplateEntity {
  type: TEMPLATE_CATEGORY;
  data: TemplatePageDataEntity[];
  name: string | null;
  body: string | null;
  thumb: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  id: string;
  created_by: string | null;
}

export interface CreateTemplateDto {
  type: TEMPLATE_CATEGORY;
  data: TemplatePageDataEntity[];
  name: string | null;
  body: string | null;
  thumb: string;
  created_by: string | null;
}

export interface DuplicateTemplateDto {
  templateId: string;
}

export interface UpdateTemplateDto {
  type?: TEMPLATE_CATEGORY;
  data?: TemplatePageDataEntity[];
  templateId: string;
  name?: string | null;
  body?: string | null;
  thumb?: string;
  created_by?: string | null;
}

export interface TemplatePageEntity {
  reference?: TemplateReferenceEntity;

  /** @format date-time */
  created_at: string;
  created_by: string;
  data: TemplatePageDataEntity[];
  id: string;
  label: string;
  templateId: string | null;
  templateName: string | null;
  templateThumb: string | null;

  /** @format date-time */
  updated_at: string;
}

export interface PublicationEntity {
  type?: TEMPLATE_CATEGORY;
  title: string | null;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  id: string;
  pages: TemplatePageEntity[] | null;
  created_by: string | null;
  cover: string | null;
}

export interface CreatePublicationPageDto {
  label: string;
  operator: string;
  publicationId: string;
}

export interface PublicationPageEntity {
  reference?: TemplateReferenceEntity;

  /** @format date-time */
  created_at: string;
  created_by: string;
  data: TemplatePageDataEntity[];
  id: string;
  label: string;
  templateId: string | null;
  templateName: string | null;
  templateThumb: string | null;

  /** @format date-time */
  updated_at: string;
}

export interface UpdatePublicationDataDto {
  type?: TEMPLATE_CATEGORY;
  title?: string | null;

  /** @format date-time */
  created_at?: string;

  /** @format date-time */
  updated_at?: string;
  id?: string;
  pages?: TemplatePageEntity[] | null;
  created_by?: string | null;
  cover?: string | null;
}

export interface UpdatePublicationDto {
  data: UpdatePublicationDataDto;
  publicationId: string;
}

export interface UpdatePublicationPageDto {
  data: PublicationPageEntity;
  pageId: string;
  publicationId: string;
}

export interface UpdatePublicationPageOrderDto {
  pages: PublicationPageEntity[];
  publicationId: string;
}

export interface FacebookInsightCostPerActionTypeEntity {
  value: number;
}

export interface FacebookInsightEntity {
  cost_per_action_type?: FacebookInsightCostPerActionTypeEntity[];
  spend: string;
  account_currency: string;
  impressions: string;
  reach: string;
  inline_post_engagement: string;
  inline_link_clicks: string;
}

export interface FacebookCampaignEntity {
  id: string;
  name: string;
  status: string;
  objective: string;
  created_time: string;
}

export interface FacebookAudienceEntity {
  id: string;
  name: string;
}

export interface FacebookTargetingEntity {
  targeting: {age_max: number; age_min: number};
}

export interface GetTargetingEntity {
  key: string;
}

export interface FacebookPreviewDataEntity {
  body: string;
}

export interface FacebookPreviewEntity {
  data?: FacebookPreviewDataEntity[];
  config: {params?: {ad_format: string}};
}

export interface FacebookCreateCampaignDto {
  title?: string;
  objective?: string;
}

export interface FacebookCreateAPIErrorEntity {
  code: number;
  error_user_title: string;
  error_user_msg: string;
}

export interface FacebookCreateAdParamsDto {
  title?: string;
  adSetId: string;
  adCreativeId?: string;
}

export interface FacebookAdEntity {
  id: string;
}

export interface FacebookCreateAdSetParamsInterestEntity {
  id: string;
  name: string;
}

export interface FacebookCreateAdSetParamsDto {
  regions?: object[];
  campaignId: string;
  budget: number;

  /** @format date-time */
  startTime?: string;

  /** @format date-time */
  endTime?: string;
  title: string;
  bidAmount: number;
  ageMax?: number;
  ageMin?: number;
  interests?: FacebookCreateAdSetParamsInterestEntity[];
}

export interface FacebookAdSetEntity {
  id: string;
}

export interface FacebookCreateSlideShowDto {
  title: string;
  link?: string;
  file?: object;
  videoId?: string;
  messaging?: string;
}

export interface CreateSlideShowDto {
  id: string;
}

export interface FacebookCreateCreativeParamsDto {
  title?: string;
  link?: string;
  image_hash: string;
  messaging: string;
}

export interface FacebookCreativeEntity {
  id: string;
}

export interface FacebookUploadImageDto {
  image_url?: string;
  image?: string;
}

export interface FacebookImageEntity {
  images: {bytes?: {hash: string}};
}

export interface FacebookUpdateCampaignDto {
  campaignId: string;
  title: string;
}

export interface FacebookUpdateAdParamsDto {
  adId: string;
  title?: string;
  adSetId: string;
  adCreativeId?: string;
}

export interface FacebookUpdateAdSetParamsDto {
  regions?: object[];
  adSetId: string;
  campaignId: string;
  budget: number;

  /** @format date-time */
  startTime?: string;

  /** @format date-time */
  endTime?: string;
  title: string;
  bidAmount: number;
  ageMax?: number;
  ageMin?: number;
  interests?: FacebookCreateAdSetParamsInterestEntity[];
}

export interface FacebookUpdateCreativeParamsDto {
  adCreativeId: string;
  title?: string;
  link?: string;
  image_hash: string;
  messaging: string;
}

export type CreateCrmDto = object;

export type UpdateCrmDto = object;

export enum ListingEditRecordStatus {
  Merged = 'merged',
  ForceMerged = 'force_merged',
  Draft = 'draft',
  WaitingForReview = 'waiting_for_review',
}

export enum ListingEditRecordHistoryStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface ListingEditRecordHistoryEntity {
  modify_detail: ListingDetail;
  status: ListingEditRecordHistoryStatus;
  id: string;
  record_id: string;
  comment: string;
  author: string;

  /** @format date-time */
  updated_at: string;
}

export interface ListingEditRecordEntity {
  status: ListingEditRecordStatus;
  listing: ListingDetail;
  listing_edit_record_history: ListingEditRecordHistoryEntity[];
  id: string;

  /** @format date-time */
  updated_at: string;
  listing_id: string;
  reviewer: string | null;
}

export interface ListingEditorReviewingDataEntity {
  editedListing: ListingDetail;
  originalListing: ListingDetail;
  recordHistory: ListingEditRecordHistoryEntity[];
}

export interface CreateListingRecordDto {
  listingId: string;
}

export interface CreateListingRecordEntity {
  recordId: string;
}

export interface PartialTypeClass {
  contract_type?: ContractTypeEnum;
  parking_detail?: ParkingDetailEntity[] | null;
  traffic_env_school?: TrafficEnvEntity[] | null;
  traffic_env_hospital?: TrafficEnvEntity[] | null;
  traffic_env_supermarket?: TrafficEnvEntity[] | null;
  traffic_env_traffic?: TrafficEnvEntity[] | null;
  traffic_env_recreation?: TrafficEnvEntity[] | null;
  traffic_env_corporate?: TrafficEnvEntity[] | null;
  country?: CountryEnum;
  status?: ListingStatusEnum;
  feature_tags?: string[] | null;
  picture_tags?: string[] | null;
  raw_image_urls?: string[] | null;
  watermark_image_urls?: string[] | null;
  youtube_video_ids?: string[] | null;
  detail_sorting_categories?: string[] | null;
  house_available_time?: string[];
  listing_state?: ListingState[];
  listing_image?: ListingImage[];
  listing_video?: ListingVideo[];
  id?: string;
  sid?: string;
  legacyid?: string | null;
  address?: string | null;
  agent1_id?: string;
  agent2_id?: string | null;
  bath?: string | null;
  building_project?: string | null;
  city?: string | null;
  common_space?: string | null;
  display_address?: string | null;
  district?: string | null;
  group?: string;
  feature_content?: string | null;
  price?: number | null;
  room?: string | null;
  title?: string;
  detail_purpose?: string | null;
  detail_category?: string | null;
  detail_floor?: string | null;
  detail_age?: string | null;
  detail_total_area_size?: string | null;
  detail_main_area_size?: string | null;
  detail_other_area_size?: string | null;
  detail_amenities_area?: string | null;
  detail_lot_size?: string | null;
  detail_parking?: string | null;
  detail_balcony?: string | null;
  detail_amenities?: string | null;
  detail_management_fee?: string | null;
  detail_land_category?: string | null;
  detail_land_purpose?: string | null;
  detail_land_size?: string | null;
  detail_land_building?: boolean | null;
  detail_guard_management?: boolean | null;
  location_latitude?: string | null;
  location_longitude?: string | null;
  detail_parking_size?: string | null;

  /** @format date-time */
  created_at?: string;

  /** @format date-time */
  updated_at?: string;
  folderid?: string | null;

  /** @format date-time */
  sold_at?: string | null;

  /** @format date-time */
  close_at?: string | null;
  floor?: string | null;
  total_floor?: string | null;
  floor_note?: string | null;
  open_layout?: boolean;
  is_parking_space_in_amenities?: boolean;
  unit?: string | null;
  sec?: string | null;
  no?: string | null;
  month_of_building_completion?: number | null;
  year_of_building_completion?: number | null;
  date_of_completion?: string | null;
  display_building_project?: boolean;
  zip_code?: string | null;
  house_available_time_type?: string | null;
  mortgage_amount?: Decimal | null;
  owner_available_contact_time?: string | null;
  owner_email?: string | null;
  owner_has_mortgage?: boolean | null;
  owner_house_viewing_way?: string | null;
  owner_ideal_price?: Decimal | null;
  owner_line?: string | null;
  owner_name?: string | null;
  owner_phone?: string | null;
  owner_sell_reason?: string | null;
}

export interface SubmitListingRecordDto {
  record: PartialTypeClass;
  recordId: string;
  comment: string;
  readyReview: boolean;
}

export interface ApproveListingRecordDto {
  recordId: string;
}

export interface ForceInactiveListingDto {
  listingId: string;
}

export interface JobEntity {
  id: string;
  sid: string;
  title: string | null;
  jd: string;
  fulltime: boolean;
  org: string;
  location: string | null;
  city: string | null;
  archived: boolean;

  /** @format date-time */
  created_at: string | null;

  /** @format date-time */
  expire_at: string | null;
  qualification: string | null;
  offer: string | null;
}

export interface HomePageEntity {
  listings: ListingDetail[];
  agents: Agent[];
  jobs: JobEntity[];
  medias: MediaEntity[];
}

export type CreateUserDto = object;

export interface CreateUserRoleDto {
  id: string;
  role: string;
  user_id: string;
}

export interface UserRole {
  id: string;
  role: string;
  user_id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;

  /** @format date-time */
  email_verified: string;
  image: string;
  role: string;
  user_role: UserRole[];
}

export type UpdateUserDto = object;

export interface SendEmailContactMailDto {
  type: 'CONTACT';
  name: string;
  phone: string;
}

export interface SendEmailSellMailDto {
  type: 'SELL';
  name: string;
  phone: string;
  address: string;
}

export interface SendEmailBuyMailDto {
  type: 'BUY';
  name: string;
  phone: string;
  listing_id: string;
}

export interface SendEmailSpecificAgentMailDto {
  type: 'SPECIFIC_AGENT';
  agent_id: string;
  name: string;
  phone: string;
}

export interface SendEmailSpecificTimeMailDto {
  type: 'SPECIFIC_TIME';
  name: string;
  contactTime: string;
  listing_id: string;
  phone: string;
  email: string;
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      requestParams.headers.common = {Accept: '*/*'};
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData
          ? {'Content-Type': type}
          : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };

  private mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === 'object' && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }
}

/**
 * @title Funwoo APis
 * @version 1.0
 * @contact
 *
 * The cats API description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  crm = {
    /**
     * No description
     *
     * @tags CRM
     * @name FindAll
     * @request GET:/referrals
     */
    findAll: (params: RequestParams = {}) =>
      this.request<Referral[], any>({
        path: `/referrals`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRM
     * @name FindOne
     * @request GET:/referrals/{id}
     */
    findOne: (
      id: string,
      query: {platform: string},
      params: RequestParams = {},
    ) =>
      this.request<Decimal, any>({
        path: `/referrals/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRM
     * @name Update
     * @request PATCH:/referrals/{id}
     */
    update: (id: string, data: UpdateReferralDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/referrals/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRM
     * @name Remove
     * @request DELETE:/referrals/{id}
     */
    remove: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/referrals/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRM
     * @name GetLineLink
     * @request GET:/referrals/line/link
     */
    getLineLink: (
      query: {
        listing_sid: string;
        source_type: 'web' | 'meta_ads' | 'one_page_flyer';
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/referrals/line/link`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRM
     * @name UpsertLineReferral
     * @request POST:/referrals/line/upsert
     */
    upsertLineReferral: (
      data: CreateLineVisitorDto,
      params: RequestParams = {},
    ) =>
      this.request<ReferralLine, any>({
        path: `/referrals/line/upsert`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRM
     * @name GetMetaLink
     * @request GET:/referrals/meta/link
     */
    getMetaLink: (
      query: {
        listing_sid: string;
        source_type: 'web' | 'meta_ads' | 'one_page_flyer';
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/referrals/meta/link`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRM
     * @name MetaWebhookGet
     * @request GET:/referrals/meta/webhook
     */
    metaWebhookGet: (
      query: {
        'hub.mode': string;
        'hub.verify_token': string;
        'hub.challenge': string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/referrals/meta/webhook`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRM
     * @name MetaWebhookPost
     * @request POST:/referrals/meta/webhook
     */
    metaWebhookPost: (data: CreateMetaWebhookDto, params: RequestParams = {}) =>
      this.request<object[], any>({
        path: `/referrals/meta/webhook`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  asset = {
    /**
     * No description
     *
     * @tags asset
     * @name UploadImage
     * @request POST:/asset/image/upload
     * @secure
     */
    uploadImage: (
      data: {listingId?: string; tag?: string; order?: number; file?: File},
      params: RequestParams = {},
    ) =>
      this.request<ListingImage, any>({
        path: `/asset/image/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags asset
     * @name AddVideo
     * @request POST:/asset/video/add
     * @secure
     */
    addVideo: (data: AddVideoDto, params: RequestParams = {}) =>
      this.request<ListingVideo, any>({
        path: `/asset/video/add`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags asset
     * @name UploadToGoogle
     * @request POST:/asset
     * @secure
     */
    uploadToGoogle: (
      data: {id?: string; file?: File},
      params: RequestParams = {},
    ) =>
      this.request<UploadToGoogle, any>({
        path: `/asset`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags asset
     * @name UploadToGoogleSpecificBucket
     * @request POST:/asset/google/specific-bucket
     * @secure
     */
    uploadToGoogleSpecificBucket: (
      data: UploadToGoogleSpecificBucketDto,
      params: RequestParams = {},
    ) =>
      this.request<string[], any[]>({
        path: `/asset/google/specific-bucket`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags asset
     * @name DeleteImage
     * @request DELETE:/asset/image/delete/{id}
     * @secure
     */
    deleteImage: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/asset/image/delete/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags asset
     * @name DeleteVideo
     * @request DELETE:/asset/video/delete/{id}
     * @secure
     */
    deleteVideo: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/asset/video/delete/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  agentApi = {
    /**
     * No description
     *
     * @tags AgentApi
     * @name FindAll
     * @request GET:/agent
     */
    findAll: (params: RequestParams = {}) =>
      this.request<Agent[], any>({
        path: `/agent`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AgentApi
     * @name Update
     * @request PUT:/agent
     * @secure
     */
    update: (data: UpdateAgentDto, params: RequestParams = {}) =>
      this.request<Agent, any>({
        path: `/agent`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AgentApi
     * @name FindOne
     * @request GET:/agent/specific/{id}
     */
    findOne: (
      id: string,
      query?: {onlyActive?: boolean},
      params: RequestParams = {},
    ) =>
      this.request<Agent, any>({
        path: `/agent/specific/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AgentApi
     * @name FindAllSids
     * @request GET:/agent/allSids
     */
    findAllSids: (query?: {onlyActive?: boolean}, params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/agent/allSids`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  mailApi = {
    /**
     * No description
     *
     * @tags MailApi
     * @name Create
     * @request POST:/mail/send
     */
    create: (data: CreateMailDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/mail/send`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags MailApi
     * @name SendVerifyEmail
     * @request POST:/mail/sendVerifyEmail
     */
    sendVerifyEmail: (data: SendVerifyEmailDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/mail/sendVerifyEmail`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags MailApi
     * @name SendEmail
     * @request POST:/mail/sendMail
     */
    sendEmail: (
      data:
        | SendEmailBuyMailDto
        | SendEmailContactMailDto
        | SendEmailSellMailDto
        | SendEmailSpecificAgentMailDto
        | SendEmailSpecificTimeMailDto
        | (SendEmailBuyMailDto &
            SendEmailContactMailDto &
            SendEmailSellMailDto &
            SendEmailSpecificAgentMailDto &
            SendEmailSpecificTimeMailDto),
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/mail/sendMail`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  authApi = {
    /**
     * No description
     *
     * @tags AuthApi
     * @name RefreshToken
     * @request POST:/auth/google/refresh_jwt
     */
    refreshToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/google/refresh_jwt`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthApi
     * @name IssueGoogleOAuth
     * @request GET:/auth/google/issue
     */
    issueGoogleOAuth: (
      query: {state: string; useDeprecated?: boolean},
      params: RequestParams = {},
    ) =>
      this.request<AuthIssueGoogleOauthEntity, any>({
        path: `/auth/google/issue`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthApi
     * @name GoogleAuthCallback
     * @request POST:/auth/google/auth/web
     */
    googleAuthCallback: (
      data: GoogleAuthCallbackDto,
      params: RequestParams = {},
    ) =>
      this.request<BackyardUserEntity, any>({
        path: `/auth/google/auth/web`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthApi
     * @name PwdAuth
     * @request POST:/auth/google/auth/pwd
     */
    pwdAuth: (data: PasswordAuth, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/google/auth/pwd`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthApi
     * @name VerifyByEmail
     * @request POST:/auth/verify/email
     */
    verifyByEmail: (data: VerifyEmailDto, params: RequestParams = {}) =>
      this.request<BackyardUserEntity, any>({
        path: `/auth/verify/email`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthApi
     * @name GoogleAuthMobile
     * @request POST:/auth/google/auth/mobile
     */
    googleAuthMobile: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/google/auth/mobile`,
        method: 'POST',
        ...params,
      }),
  };
  listingApi = {
    /**
     * No description
     *
     * @tags ListingApi
     * @name Search
     * @request POST:/listing
     */
    search: (data: SearchListingDto, params: RequestParams = {}) =>
      this.request<ListingPaginationEntity, any>({
        path: `/listing`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingApi
     * @name FindAll
     * @request GET:/listing
     */
    findAll: (params: RequestParams = {}) =>
      this.request<ListingDetail[], any>({
        path: `/listing`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingApi
     * @name FindOne
     * @request GET:/listing/specific/{sid}
     */
    findOne: (sid: string, params: RequestParams = {}) =>
      this.request<ListingDetail, any>({
        path: `/listing/specific/${sid}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingApi
     * @name FindOneForBuy
     * @request GET:/listing/forBuy
     */
    findOneForBuy: (
      query: {listingSid: string; agentSid: string},
      params: RequestParams = {},
    ) =>
      this.request<ListingForBuy, any>({
        path: `/listing/forBuy`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingApi
     * @name FindAllFavorite
     * @request GET:/listing/favorite
     */
    findAllFavorite: (query: {sids: string[]}, params: RequestParams = {}) =>
      this.request<ListingDetail[], any>({
        path: `/listing/favorite`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingApi
     * @name FindAllSids
     * @request GET:/listing/allSids
     */
    findAllSids: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/listing/allSids`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingApi
     * @name SearchByAddress
     * @request POST:/listing/search/byAddress
     * @secure
     */
    searchByAddress: (
      data: SearchListingByAddressDto,
      params: RequestParams = {},
    ) =>
      this.request<ListingPaginationEntity, any>({
        path: `/listing/search/byAddress`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingApi
     * @name CreateFromCma
     * @request POST:/listing/create/fromCMA
     * @secure
     */
    createFromCma: (
      data: CreateListingFromCMADto,
      params: RequestParams = {},
    ) =>
      this.request<ListingDetail, any>({
        path: `/listing/create/fromCMA`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingApi
     * @name CreateFromEmptyAddress
     * @request POST:/listing/create/fromEmptyAddress
     * @secure
     */
    createFromEmptyAddress: (
      data: CreateListingFromEmptyAddressDto,
      params: RequestParams = {},
    ) =>
      this.request<ListingDetail, any>({
        path: `/listing/create/fromEmptyAddress`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingApi
     * @name Clone
     * @request POST:/listing/create/clone
     * @secure
     */
    clone: (data: CloneListingDto, params: RequestParams = {}) =>
      this.request<ListingDetail, any>({
        path: `/listing/create/clone`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  mediaApi = {
    /**
     * No description
     *
     * @tags MediaApi
     * @name FindAll
     * @request GET:/media
     */
    findAll: (query?: {count?: number}, params: RequestParams = {}) =>
      this.request<MediaEntity[], any>({
        path: `/media`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  optionApi = {
    /**
     * No description
     *
     * @tags OptionApi
     * @name GetOptionsForBuy
     * @request GET:/option/optionsForBuy
     */
    getOptionsForBuy: (params: RequestParams = {}) =>
      this.request<GetOptionsForBuy, any>({
        path: `/option/optionsForBuy`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  bookApi = {
    /**
     * No description
     *
     * @tags BookApi
     * @name FindAllByType
     * @request GET:/book
     * @secure
     */
    findAllByType: (
      query: {
        type:
          | 'ALL'
          | 'LISTING_PRESENTATION'
          | 'SOCIAL_MEDIA'
          | 'ONE_PAGE_FLYER';
      },
      params: RequestParams = {},
    ) =>
      this.request<Book[], any>({
        path: `/book`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name FindOneByBookId
     * @request GET:/book/specific/byBookId/{bookId}
     * @secure
     */
    findOneByBookId: (bookId: string, params: RequestParams = {}) =>
      this.request<Book, any>({
        path: `/book/specific/byBookId/${bookId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name FindOneByBookType
     * @request GET:/book/specific/byBookType
     * @secure
     */
    findOneByBookType: (
      query: {
        type:
          | 'ALL'
          | 'LISTING_PRESENTATION'
          | 'SOCIAL_MEDIA'
          | 'ONE_PAGE_FLYER';
      },
      params: RequestParams = {},
    ) =>
      this.request<Book, any>({
        path: `/book/specific/byBookType`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name Create
     * @request POST:/book/create
     * @secure
     */
    create: (data: CreateBookDto, params: RequestParams = {}) =>
      this.request<Book, any>({
        path: `/book/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name UpdateTitle
     * @request PUT:/book/update/title
     * @secure
     */
    updateTitle: (data: UpdateBookTitleDto, params: RequestParams = {}) =>
      this.request<Book, any>({
        path: `/book/update/title`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name UpdatePage
     * @request PUT:/book/update/page
     * @secure
     */
    updatePage: (data: UpdateBookPageDto, params: RequestParams = {}) =>
      this.request<Book, any>({
        path: `/book/update/page`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name UpdateWholePage
     * @request PUT:/book/update/wholePage
     * @secure
     */
    updateWholePage: (
      data: UpdateWholeBookPageDto,
      params: RequestParams = {},
    ) =>
      this.request<Book, any>({
        path: `/book/update/wholePage`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name UpdatePageReference
     * @request PUT:/book/update/page/reference
     * @secure
     */
    updatePageReference: (
      data: UpdateBookPageReferenceDto,
      params: RequestParams = {},
    ) =>
      this.request<Book, any>({
        path: `/book/update/page/reference`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name ResetPage
     * @request PUT:/book/reset/page
     * @secure
     */
    resetPage: (data: ResetBookPageDto, params: RequestParams = {}) =>
      this.request<Book, any>({
        path: `/book/reset/page`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name Delete
     * @request DELETE:/book/book/{bookId}
     * @secure
     */
    delete: (bookId: string, params: RequestParams = {}) =>
      this.request<Book, any>({
        path: `/book/book/${bookId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags BookApi
     * @name DeletePage
     * @request DELETE:/book/page/{bookId}/{pageId}
     * @secure
     */
    deletePage: (bookId: string, pageId: string, params: RequestParams = {}) =>
      this.request<Book, any>({
        path: `/book/page/${bookId}/${pageId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  templateApi = {
    /**
     * No description
     *
     * @tags TemplateApi
     * @name FindAll
     * @request GET:/template
     * @secure
     */
    findAll: (params: RequestParams = {}) =>
      this.request<TemplateEntity[], any>({
        path: `/template`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags TemplateApi
     * @name Create
     * @request POST:/template
     * @secure
     */
    create: (data: CreateTemplateDto, params: RequestParams = {}) =>
      this.request<TemplateEntity, any>({
        path: `/template`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags TemplateApi
     * @name FindOne
     * @request GET:/template/{templateId}
     * @secure
     */
    findOne: (templateId: string, params: RequestParams = {}) =>
      this.request<TemplateEntity, any>({
        path: `/template/${templateId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags TemplateApi
     * @name Delete
     * @request DELETE:/template/{templateId}
     * @secure
     */
    delete: (templateId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/template/${templateId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags TemplateApi
     * @name DuplicateTemplate
     * @request POST:/template/duplicate
     * @secure
     */
    duplicateTemplate: (
      data: DuplicateTemplateDto,
      params: RequestParams = {},
    ) =>
      this.request<TemplateEntity, any>({
        path: `/template/duplicate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags TemplateApi
     * @name Update
     * @request PUT:/template/update
     * @secure
     */
    update: (data: UpdateTemplateDto, params: RequestParams = {}) =>
      this.request<TemplateEntity, any>({
        path: `/template/update`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  publicationApi = {
    /**
     * No description
     *
     * @tags PublicationApi
     * @name FindAll
     * @request GET:/publication
     * @secure
     */
    findAll: (params: RequestParams = {}) =>
      this.request<PublicationEntity[], any>({
        path: `/publication`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicationApi
     * @name FindOne
     * @request GET:/publication/{bookId}
     * @secure
     */
    findOne: (bookId: string, params: RequestParams = {}) =>
      this.request<PublicationEntity, any>({
        path: `/publication/${bookId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicationApi
     * @name CreatePage
     * @request POST:/publication/create/page
     * @secure
     */
    createPage: (data: CreatePublicationPageDto, params: RequestParams = {}) =>
      this.request<PublicationPageEntity, any>({
        path: `/publication/create/page`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicationApi
     * @name UpdatePublication
     * @request PUT:/publication/update/publication
     * @secure
     */
    updatePublication: (
      data: UpdatePublicationDto,
      params: RequestParams = {},
    ) =>
      this.request<PublicationEntity, any>({
        path: `/publication/update/publication`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicationApi
     * @name UpdatePublicationPage
     * @request PUT:/publication/update/page
     * @secure
     */
    updatePublicationPage: (
      data: UpdatePublicationPageDto,
      params: RequestParams = {},
    ) =>
      this.request<PublicationEntity, any>({
        path: `/publication/update/page`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicationApi
     * @name UpdatePublicationPageOrder
     * @request PUT:/publication/update/page/order
     * @secure
     */
    updatePublicationPageOrder: (
      data: UpdatePublicationPageOrderDto,
      params: RequestParams = {},
    ) =>
      this.request<PublicationEntity, any>({
        path: `/publication/update/page/order`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicationApi
     * @name DeletePublication
     * @request DELETE:/publication/{publicationId}
     * @secure
     */
    deletePublication: (publicationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/publication/${publicationId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicationApi
     * @name DeletePublicationPage
     * @request DELETE:/publication/page/{publicationId}
     * @secure
     */
    deletePublicationPage: (
      publicationId: string,
      query: {pageId: string},
      params: RequestParams = {},
    ) =>
      this.request<PublicationEntity, any>({
        path: `/publication/page/${publicationId}`,
        method: 'DELETE',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  facebookApi = {
    /**
     * No description
     *
     * @tags FacebookApi
     * @name GetInsights
     * @request GET:/facebook/insight
     * @secure
     */
    getInsights: (
      query: {campaignId: string; startDate: string; endDate: string},
      params: RequestParams = {},
    ) =>
      this.request<FacebookInsightEntity[], any>({
        path: `/facebook/insight`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name GetCampaigns
     * @request GET:/facebook/campaign
     * @secure
     */
    getCampaigns: (params: RequestParams = {}) =>
      this.request<FacebookCampaignEntity[], any>({
        path: `/facebook/campaign`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name GetAudiences
     * @request GET:/facebook/audience
     * @secure
     */
    getAudiences: (params: RequestParams = {}) =>
      this.request<FacebookAudienceEntity[], any>({
        path: `/facebook/audience`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name GetAudienceDetail
     * @request GET:/facebook/audience/detail/{audienceId}
     * @secure
     */
    getAudienceDetail: (audienceId: string, params: RequestParams = {}) =>
      this.request<FacebookTargetingEntity, any>({
        path: `/facebook/audience/detail/${audienceId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name GetTargeting
     * @request GET:/facebook/targeting
     * @secure
     */
    getTargeting: (query?: {q?: string}, params: RequestParams = {}) =>
      this.request<GetTargetingEntity[], any>({
        path: `/facebook/targeting`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name GetPreview
     * @request GET:/facebook/preview/{creativeId}
     * @secure
     */
    getPreview: (
      creativeId: string,
      query: {ad_format: string},
      params: RequestParams = {},
    ) =>
      this.request<FacebookPreviewEntity, any>({
        path: `/facebook/preview/${creativeId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name CreateCampaign
     * @request POST:/facebook/campaign/create
     * @secure
     */
    createCampaign: (
      data: FacebookCreateCampaignDto,
      params: RequestParams = {},
    ) =>
      this.request<FacebookCampaignEntity, FacebookCreateAPIErrorEntity>({
        path: `/facebook/campaign/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name CreateAd
     * @request POST:/facebook/ad/create
     * @secure
     */
    createAd: (data: FacebookCreateAdParamsDto, params: RequestParams = {}) =>
      this.request<FacebookAdEntity, FacebookCreateAPIErrorEntity>({
        path: `/facebook/ad/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name CreateAdSet
     * @request POST:/facebook/adSet/create
     * @secure
     */
    createAdSet: (
      data: FacebookCreateAdSetParamsDto,
      params: RequestParams = {},
    ) =>
      this.request<FacebookAdSetEntity, FacebookCreateAPIErrorEntity>({
        path: `/facebook/adSet/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name CreateSlideShow
     * @request POST:/facebook/slideShow/create
     * @secure
     */
    createSlideShow: (
      data: FacebookCreateSlideShowDto,
      params: RequestParams = {},
    ) =>
      this.request<CreateSlideShowDto, FacebookCreateAPIErrorEntity>({
        path: `/facebook/slideShow/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name CreateCreative
     * @request POST:/facebook/creative/create
     * @secure
     */
    createCreative: (
      data: FacebookCreateCreativeParamsDto,
      params: RequestParams = {},
    ) =>
      this.request<FacebookCreativeEntity, FacebookCreateAPIErrorEntity>({
        path: `/facebook/creative/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name UploadImage
     * @request POST:/facebook/image/upload
     * @secure
     */
    uploadImage: (data: FacebookUploadImageDto, params: RequestParams = {}) =>
      this.request<FacebookImageEntity, any>({
        path: `/facebook/image/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name UpdateCampaign
     * @request PUT:/facebook/campaign/update
     * @secure
     */
    updateCampaign: (
      data: FacebookUpdateCampaignDto,
      params: RequestParams = {},
    ) =>
      this.request<FacebookCampaignEntity, any>({
        path: `/facebook/campaign/update`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name UpdateAd
     * @request PUT:/facebook/ad/update
     * @secure
     */
    updateAd: (data: FacebookUpdateAdParamsDto, params: RequestParams = {}) =>
      this.request<FacebookAdEntity, any>({
        path: `/facebook/ad/update`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name UpdateAdSet
     * @request PUT:/facebook/adSet/update
     * @secure
     */
    updateAdSet: (
      data: FacebookUpdateAdSetParamsDto,
      params: RequestParams = {},
    ) =>
      this.request<FacebookAdEntity, any>({
        path: `/facebook/adSet/update`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name UpdateCreative
     * @request PUT:/facebook/creative/update
     * @secure
     */
    updateCreative: (
      data: FacebookUpdateCreativeParamsDto,
      params: RequestParams = {},
    ) =>
      this.request<FacebookAdEntity, any>({
        path: `/facebook/creative/update`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name DeleteCampaign
     * @request DELETE:/facebook/campaign/delete/{campaignId}
     * @secure
     */
    deleteCampaign: (campaignId: string, params: RequestParams = {}) =>
      this.request<FacebookCampaignEntity, any>({
        path: `/facebook/campaign/delete/${campaignId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name DeleteAd
     * @request DELETE:/facebook/ad/delete/{adId}
     * @secure
     */
    deleteAd: (adId: string, params: RequestParams = {}) =>
      this.request<FacebookCampaignEntity, any>({
        path: `/facebook/ad/delete/${adId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name DeleteSetAd
     * @request DELETE:/facebook/adSet/delete/{adSetId}
     * @secure
     */
    deleteSetAd: (adSetId: string, params: RequestParams = {}) =>
      this.request<FacebookCampaignEntity, any>({
        path: `/facebook/adSet/delete/${adSetId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FacebookApi
     * @name DeleteCreative
     * @request DELETE:/facebook/creative/delete/{adCreativeId}
     * @secure
     */
    deleteCreative: (adCreativeId: string, params: RequestParams = {}) =>
      this.request<FacebookCampaignEntity, any>({
        path: `/facebook/creative/delete/${adCreativeId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  crmServer = {
    /**
     * No description
     *
     * @tags CRMServer
     * @name Create
     * @request POST:/crm
     */
    create: (data: CreateCrmDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/crm`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRMServer
     * @name FindAll
     * @request GET:/crm
     */
    findAll: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/crm`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRMServer
     * @name GetLivechatRooms
     * @request GET:/crm/livechat/rooms
     * @secure
     */
    getLivechatRooms: (
      query: {updatedSince: string},
      params: RequestParams = {},
    ) =>
      this.request<Decimal, any>({
        path: `/crm/livechat/rooms`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRMServer
     * @name FindOne
     * @request GET:/crm/{id}
     */
    findOne: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/crm/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRMServer
     * @name Update
     * @request PATCH:/crm/{id}
     */
    update: (id: string, data: UpdateCrmDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/crm/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CRMServer
     * @name Remove
     * @request DELETE:/crm/{id}
     */
    remove: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/crm/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  listingEditorApi = {
    /**
     * No description
     *
     * @tags ListingEditorApi
     * @name FindAllForUser
     * @request GET:/listing-editor/forUser
     * @secure
     */
    findAllForUser: (params: RequestParams = {}) =>
      this.request<ListingEditRecordEntity[], any>({
        path: `/listing-editor/forUser`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingEditorApi
     * @name FindAllReviewing
     * @request GET:/listing-editor/reviewing
     * @secure
     */
    findAllReviewing: (params: RequestParams = {}) =>
      this.request<ListingEditRecordEntity[], any>({
        path: `/listing-editor/reviewing`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingEditorApi
     * @name FindReviewingData
     * @request GET:/listing-editor/reviewing/data/{recordId}
     * @secure
     */
    findReviewingData: (recordId: string, params: RequestParams = {}) =>
      this.request<ListingEditorReviewingDataEntity, any>({
        path: `/listing-editor/reviewing/data/${recordId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingEditorApi
     * @name StartReview
     * @request POST:/listing-editor/start/review
     * @secure
     */
    startReview: (query: {recordId: string}, params: RequestParams = {}) =>
      this.request<ListingEditRecordEntity, any>({
        path: `/listing-editor/start/review`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingEditorApi
     * @name CreateRecord
     * @request POST:/listing-editor/create/record
     * @secure
     */
    createRecord: (data: CreateListingRecordDto, params: RequestParams = {}) =>
      this.request<CreateListingRecordEntity, any>({
        path: `/listing-editor/create/record`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingEditorApi
     * @name SubmitEditRecord
     * @request POST:/listing-editor/submit
     * @secure
     */
    submitEditRecord: (
      data: SubmitListingRecordDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/listing-editor/submit`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingEditorApi
     * @name ApproveReview
     * @request POST:/listing-editor/approve
     * @secure
     */
    approveReview: (
      data: ApproveListingRecordDto,
      params: RequestParams = {},
    ) =>
      this.request<ListingDetail, any>({
        path: `/listing-editor/approve`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags ListingEditorApi
     * @name ForceInactive
     * @request PUT:/listing-editor/forceInactive
     * @secure
     */
    forceInactive: (
      data: ForceInactiveListingDto,
      params: RequestParams = {},
    ) =>
      this.request<ListingDetail, any>({
        path: `/listing-editor/forceInactive`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  homepageApi = {
    /**
     * No description
     *
     * @tags HomepageApi
     * @name GetHomepageInfo
     * @request GET:/home-page
     */
    getHomepageInfo: (params: RequestParams = {}) =>
      this.request<HomePageEntity, any>({
        path: `/home-page`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  jobApi = {
    /**
     * No description
     *
     * @tags JobApi
     * @name FindAll
     * @request GET:/job
     */
    findAll: (params: RequestParams = {}) =>
      this.request<JobEntity[], any>({
        path: `/job`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags JobApi
     * @name FindOne
     * @request GET:/job/{sid}
     */
    findOne: (sid: string, params: RequestParams = {}) =>
      this.request<JobEntity, any>({
        path: `/job/${sid}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name Create
     * @request POST:/users
     */
    create: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name FindAll
     * @request GET:/users
     */
    findAll: (params: RequestParams = {}) =>
      this.request<any, User>({
        path: `/users`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name AddUserRole
     * @request POST:/users/addRole
     */
    addUserRole: (data: CreateUserRoleDto, params: RequestParams = {}) =>
      this.request<Decimal, any>({
        path: `/users/addRole`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name FindOne
     * @request GET:/users/{id}
     */
    findOne: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name Update
     * @request PATCH:/users/{id}
     */
    update: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name Remove
     * @request DELETE:/users/{id}
     */
    remove: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/users/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  pluginApi = {
    /**
     * No description
     *
     * @tags PluginApi
     * @name UploadFigmaTemplate
     * @request POST:/plugin/figma/template
     */
    uploadFigmaTemplate: (data: {file?: File}, params: RequestParams = {}) =>
      this.request<TemplateEntity, any>({
        path: `/plugin/figma/template`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),
  };

  /**
   * No description
   *
   * @name GetHello
   * @request GET:/
   */
  getHello = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
