export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
}

// Pages
export interface PageSummary {
  id: number;
  slug: string;
  title: string;
  parent: number;
  sort: number;
  template: string;
  page_image: string | null;
  public: boolean;
}

export interface PageNormalized {
  id: number;
  slug: string;
  template: string;
  title: string;
  extra_description: string | null;
  body: string | null;
  page_image: string | null;
  page_background_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_description: string | null;
  title_suffix: string | null;
  public: boolean;
  parent: number;
  sort: number;
  extra_content: Record<string, string>;
  multicontent: Record<string, object>;
  sections: object[];
  langs: string[];
  created_at: string;
  updated_at: string;
}

// Articles
export interface ArticleCategoryRef {
  id: number;
  slug: string;
  title: string;
}

export interface ArticleSummary {
  id: number;
  slug: string;
  title: string;
  image: string | null;
  category: ArticleCategoryRef | null;
  active: boolean;
  top: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  body: string | null;
  meta_title: string | null;
  meta_description: string | null;
  image: string | null;
  category: ArticleCategoryRef | null;
  active: boolean;
  private: boolean;
  top: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleCategory {
  id: number;
  slug: string;
  parent: number;
  sort: number;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
}

// Products
export interface ProductCategoryRef {
  id: number;
  slug: string;
  title: string;
}

export interface ProductImage {
  id: number;
  url: string;
  sort: number;
  alt: string;
}

export interface ProductSummary {
  id: number;
  slug: string;
  name: string;
  price: number;
  discount: number | null;
  discount_type: string | null;
  effective_price: number;
  sku: string | null;
  active: boolean;
  category: ProductCategoryRef | null;
  thumbnail: string | null;
}

export interface AttributeValue {
  id: number;
  name: string;
}

export interface RawAttributeValue {
  attribute_id: number;
  numeric_value: number | null;
  date_value: string | null;
  text_value: string | null;
}

export interface ProductAttributePredefined {
  attribute_id: number;
  attribute_name: string;
  type: string;
  show_on_card: boolean;
  values: { id: number; name: string }[];
}

export interface ProductAttributeRaw {
  attribute_id: number;
  attribute_name: string;
  type: string;
  prefix: string | null;
  suffix: string | null;
  value: string | null;
  numeric_value: number | null;
  date_value: string | null;
}

export interface ProductVariationValue {
  id: number;
  name: string;
  color: string | null;
  image: string | null;
  sort: number;
}

export interface ProductVariationCategory {
  id: number;
  name: string;
  value_type: string;
  layout: string;
  sort: number;
}

export interface ProductVariationCategoryFull extends ProductVariationCategory {
  values: ProductVariationValue[];
}

export interface ProductVariationSet {
  id: number;
  active: boolean;
  price: number;
  discount: number | null;
  discount_type: string | null;
  effective_price: number;
  sku: string | null;
  quantity: number;
  image: string | null;
  items: { variation_value_id: number }[];
}

export interface ProductOptionItem {
  id: number;
  name: string;
  price_change: number;
  sort: number;
}

export interface ProductOptionCategory {
  id: number;
  name: string;
  type: string;
  required: boolean;
  options: ProductOptionItem[];
}

export interface ProductSection {
  id: number;
  key: string;
  sort: number;
  public: boolean;
  extra_content: Record<string, string>;
  multicontent: Record<string, object>;
}

export interface ProductNormalized {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_description: string | null;
  price: number;
  discount: number | null;
  discount_type: string | null;
  effective_price: number;
  sku: string | null;
  barcode: string | null;
  quantity: number;
  weight: number;
  product_type: string;
  active: boolean;
  template: string | null;
  category: ProductCategoryRef | null;
  images: ProductImage[];
  sections: ProductSection[];
  attributes: {
    predefined: ProductAttributePredefined[];
    raw: ProductAttributeRaw[];
  };
  variations: {
    categories: ProductVariationCategory[];
    sets: ProductVariationSet[];
  };
  options: ProductOptionCategory[];
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: number;
  slug: string;
  parent: number;
  sort: number;
  public: boolean;
  title: string;
  image: string | null;
  children: ProductCategory[];
}

export interface ProductAttribute {
  id: number;
  name: string;
  type: string;
  filter: boolean;
  active: boolean;
  prefix: string | null;
  suffix: string | null;
  show_on_card: boolean;
}

export interface ProductAttributeFull extends ProductAttribute {
  values: AttributeValue[];
}

// Orders
export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_thumbnail: string | null;
  qty: number;
  price: number;
  orig_price: number;
  discount: number;
  variation_id: number | null;
  variation_price: number | null;
  options: {
    category_id: number;
    category_name: string;
    option_id: number;
    option_name: string;
  }[];
}

export interface Order {
  id: number;
  status: string;
  payment_status: string;
  payment_type: string;
  customer_id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  office: string | null;
  delivery: string | null;
  payment: string | null;
  comment: string | null;
  total: number;
  currency: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderSummary {
  id: number;
  status: string;
  payment_status: string;
  customer_id: number | null;
  email: string;
  total: number;
  currency: string;
  item_count: number;
  created_at: string;
  updated_at: string;
}

// Indexed URLs
export interface IndexedUrl {
  id: number;
  url: string;
  resource_type: string;
  resource_id: number;
  active: boolean;
}
