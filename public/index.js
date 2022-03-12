// lib/errors.ts
var Errors = /* @__PURE__ */ ((Errors2) => {
  Errors2["NO_CACHE_IN_CONSTRUCTOR"] = "No Cache given in contructor";
  Errors2["NO_STORAGE_IN_CONSTRUCTOR"] = "No Storage given in contructor";
  Errors2["NO_CLIENT_IN_CONSTRUCTOR"] = "No Client given in contructor";
  return Errors2;
})(Errors || {});
var errors_default = Errors;

// lib/request.ts
var Request = class {
  constructor({ url: url2, method, data }) {
    this.url = url2;
    this.method = method;
    this.info = {};
    this.data = data;
  }
};
var request_default = Request;

// lib/cachy.ts
var Cachy = class {
  constructor(config) {
    if (!(config == null ? void 0 : config.cache)) {
      throw new Error(errors_default.NO_CACHE_IN_CONSTRUCTOR);
    }
    if (!(config == null ? void 0 : config.client)) {
      throw new Error(errors_default.NO_CLIENT_IN_CONSTRUCTOR);
    }
    this.cache = config.cache;
    this.client = config.client;
    this.options = config.options;
  }
  async request({ url: url2, method, data }) {
    var _a;
    const request = new request_default({
      url: url2,
      method,
      data
    });
    let requestId = `${request.method}-${request.url}`;
    const hasCustomIdFunction = !!((_a = this.options) == null ? void 0 : _a.generateId);
    if (hasCustomIdFunction) {
      requestId = this.options.generateId(request);
    }
    const responseFromCache = await this.cache.handle({ id: requestId, request });
    const responseThroughCacheSuccess = responseFromCache !== false;
    if (responseThroughCacheSuccess) {
      return responseFromCache;
    }
    const response = await this.client.request(request);
    return await this.cache.handle({ id: requestId, request, response });
  }
};
var cachy_default = Cachy;

// lib/cache.ts
var Cache = class {
  constructor({ storage: storage2 }) {
    this.storage = storage2;
  }
  async write({ id, item }) {
    let writeCacheSuccess = false;
    try {
      writeCacheSuccess = await this.storage.write({ id, item });
    } catch (error) {
      writeCacheSuccess = false;
    }
    return writeCacheSuccess;
  }
  async read({ id }) {
    try {
      return await this.storage.read({ id });
    } catch (error) {
      return false;
    }
  }
};
var cache_default = Cache;

// lib/cache-item.ts
var CacheItem = class {
  constructor({ request, response }) {
    this.request = request;
    this.response = response;
  }
};
var cache_item_default = CacheItem;

// public/fetch-client.ts
var FetchClient = class {
  async request(requestData) {
    if (requestData.method === "get") {
      const response = await fetch(requestData.url);
      const data = await response.json();
      return data;
    }
  }
};
var fetch_client_default = FetchClient;

// public/local-storage.ts
var LocalStorage = class {
  async read({ id }) {
    const result = localStorage.getItem(id);
    if (result === null) {
      return false;
    }
    return JSON.parse(result);
  }
  async write({ id, item }) {
    try {
      localStorage.setItem(id, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
var local_storage_default = LocalStorage;

// public/time-cache.ts
var TimeCache = class extends cache_default {
  constructor({ storage: storage2 }) {
    super({ storage: storage2 });
  }
  async handle({ id, request, response }) {
    if (response) {
      const currentTimestamp2 = Date.now();
      request.info = {
        lastUpdate: currentTimestamp2
      };
      const item2 = new cache_item_default({
        request,
        response
      });
      await this.write({ id, item: item2 });
      return item2;
    }
    const item = await this.read({ id });
    const noItemInCache = item === false;
    if (noItemInCache) {
      return false;
    }
    const lastUpdate = item.request.info.lastUpdate;
    const currentTimestamp = Date.now();
    const shouldRefreshRequest = currentTimestamp - lastUpdate > 60 * 1e3;
    if (shouldRefreshRequest) {
      return false;
    }
    return item;
  }
};
var time_cache_default = TimeCache;

// public/demo.ts
var url = (username) => `https://api.github.com/users/${username}`;
var storage = new local_storage_default();
var cache = new time_cache_default({ storage });
var client = new fetch_client_default();
var apiClient = new cachy_default({
  cache,
  client
});
var elements = {
  bio: document.querySelector(".user-info__bio"),
  location: document.querySelector(".user-info__location"),
  input: document.querySelector(".user-form__input"),
  button: document.querySelector(".user-form__button")
};
elements.button.addEventListener("click", async () => {
  const result = await apiClient.request({ url: url(elements.input.value), method: "get" });
  elements.bio.textContent = result.response.bio;
  elements.location.textContent = result.response.location;
});
