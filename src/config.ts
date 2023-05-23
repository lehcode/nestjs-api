export default (): Record<string, any> => ({
  api: {
    port: process.env.API_PORT || 3000,
    ssl: true
  },
  auth: {
    passport: {
      // More Passport strategies at http://www.passportjs.org/packages/
      strategy: 'local'
    }
  },
  hostname: process.env.HOSTNAME || 'localhost',
  services: {
  	nhtsa: {
      apiHost: 'https://vpic.nhtsa.dot.gov',
      uris: {
        vehicleVars: '/api/vehicles/GetVehicleVariableList?format=json',
        vehicleVarsValues: '/api/vehicles/GetVehicleVariableValuesList/{:id}?format=json',
        decodeVin: '/api/vehicles/DecodeVinExtended/{:vin}?format=json',
        decodeVinValues: '/vehicles/DecodeVinValuesExtended/{:vin}?format=json&modelyear={:year}'
      }
      },
    i18n: {
      defaultNs: 'default',
      namespace: 'nhtsa'
    }
  },
  env: process.env.NODE_ENV,
  locale: {
    locales: ['en', 'dev'],
    default: 'en',
    fallback: 'en'
  },
  mongo: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT_CONTAINER || 27017,
    urlParams: process.env.MONGO_URL_PARAMS || '?authMechanism=DEFAULT',
    db: process.env.MONGO_DB || 'starter',
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    secure: process.env.MONGO_SECURE
  },
  orm: {
    host: process.env.TYPEORM_HOST || 'localhost',
    port: process.env.TYPEORM_PORT || 3306,
    db: process.env.TYPEORM_DB || 'starter',
    user: process.env.TYPEORM_USER,
    pass: process.env.TYPEORM_PASS,
    // type: process.env.TYPEORM_TYPE || 'mysql'
  },
  htmlRegex: /<(\S*?)[^>]*>.*?<\/\1>|<.*?\/>/g
});
