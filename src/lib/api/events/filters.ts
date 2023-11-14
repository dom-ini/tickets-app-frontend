export type Filters = {
  slug?: string;
  name?: string;
  heldAtFrom?: string;
  heldAtTo?: string;
  isActive?: boolean;
  categoryId?: number;
  locationId?: number;
  speakerId?: number;
  locationCity?: string;
};

export type Pagination = {
  skip?: string;
  limit?: string;
};

export type Sorting = {
  sortBy?: string;
};

export type EventDataOptions = {
  filters?: Filters;
  sorting?: Sorting;
  pagination?: Pagination;
};

type SortableField = {
  name: string;
  apiName: string;
};

const filterNamesToApi: Required<{ [K in keyof Filters]: string }> = {
  slug: "slug__exact",
  name: "name__icontains",
  heldAtFrom: "held_at__gte",
  heldAtTo: "held_at__lte",
  isActive: "is_active__exact",
  categoryId: "event_type_id__exact",
  locationId: "location_id__exact",
  speakerId: "speakers__id__exact",
  locationCity: "location__city__icontains",
};

const sortingNamesToApi: Required<{ [K in keyof Sorting]: string }> = {
  sortBy: "sort_by",
};

const paginationNamesToApi: Required<{ [K in keyof Pagination]: string }> = {
  skip: "skip",
  limit: "limit",
};

export const eventSortableFields: Array<SortableField> = [
  {
    name: "Data - rosnąco",
    apiName: "held_at",
  },
  {
    name: "Data - malejąco",
    apiName: "-held_at",
  },
  {
    name: "Nazwa - rosnąco",
    apiName: "name",
  },
  {
    name: "Nazwa - malejąco",
    apiName: "-name",
  },
];

export class EventsURLBuilder {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint + "?";
  }

  protected buildQueryParams(
    map: Record<string, string | boolean | number>,
    namesToApi?: Record<string, string>,
  ) {
    let query = "";
    for (const key in map) {
      const queryValue = map[key];
      const queryName = namesToApi !== undefined ? namesToApi[key] : key;
      query += `${queryName}=${queryValue}&`;
    }
    return query;
  }

  addFilters(filters: Filters) {
    this.endpoint += this.buildQueryParams(filters, filterNamesToApi);
    return this;
  }

  addSorting(sorting: Sorting) {
    this.endpoint += this.buildQueryParams(sorting, sortingNamesToApi);
    return this;
  }

  addPagination(pagination: Pagination) {
    this.endpoint += this.buildQueryParams(pagination, paginationNamesToApi);
    return this;
  }

  getURL() {
    return this.endpoint;
  }
}
