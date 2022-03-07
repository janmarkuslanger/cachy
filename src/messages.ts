enum Message {
    NO_CONFIG_GIVEN = 'No config given',
    NO_CLIENT_GIVEN = 'No Client given in cachy',
    NO_CACHE_GIVEN = 'No Cache given in cachy',
    NO_POST_IMPLEMENTATION = 'Client has no POST implemenation',
    NO_UPDATE_IMPLEMENTATION = 'Client has no UPDATE implemenation',
    NO_DELETE_IMPLEMENTATION = 'Client has no DELETE implemenation',
    NO_GET_IMPLEMENTATION = 'Client has no GET implemenation',
    CACHE_ITEM_ALREADY_EXISTS = 'CacheItem already exists',
    NO_URL_GIVEN = 'No URL given',
};

export default Message;