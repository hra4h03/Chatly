export const RoutePaths = {
    home: () => '/',
    login: () => '/login',
    signup: () => '/signup',
    settings: () => '/settings',

    room: (uuid: React.Key = ':uuid') => `/room/${uuid}`,

    fallback: () => '*',
} as const;
