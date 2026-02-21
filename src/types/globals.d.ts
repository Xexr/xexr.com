export {};

declare global {
  interface PublicMetadata {
    credits?: number;
    preventPaymentRetriesUntil?: string;
    referredByCode?: string;
    referralCode?: string;
    hasMadePurchase?: boolean;
    previewImagesGenerated?: number;
  }
  interface UnsafeMetadata {
    unsafeReferredByCode?: string;
  }
  interface CustomJwtSessionClaims {
    username: string;
    publicMetadata: PublicMetadata;
    unsafeMetadata: UnsafeMetadata;
  }
}
