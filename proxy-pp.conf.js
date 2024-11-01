const PROXY_CONFIG = {
  '/dicom-center/**': {
    target: 'https://2-link-klon.tie.ch',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
  '/auth-service/**': {
    target: 'https://2-link-klon.tie.ch',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
  '/rest2/**': {
    target: 'https://2-link-klon.tie.ch',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
  '/wsapi/version': {
    target: 'https://2-link-klon.tie.ch',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
