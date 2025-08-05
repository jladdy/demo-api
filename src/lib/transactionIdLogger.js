const { v4: uuidv4 } = require('uuid');

const transactionIdMiddleware = (req, res, next) => {
  // Try to get transaction ID from header, else generate new UUID
  const txnId = req.headers['x-transaction-id'] || uuidv4();

  // Attach to req for downstream use
  req.transactionId = txnId;

  // Also add to response headers, so clients get it too
  res.setHeader('X-Transaction-Id', txnId);

  next();
};

module.exports = transactionIdMiddleware;