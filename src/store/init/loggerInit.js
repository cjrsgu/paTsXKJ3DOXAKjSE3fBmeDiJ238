import { createLogger } from 'redux-logger';

const options = {
  diff: true,
  collapsed: true,
  duration: true,
};
const logger = createLogger(options);

export default {
  middleware: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? [logger] : [],
};
