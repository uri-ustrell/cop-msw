const createProxyConfiguration = (path, target) => {
    const isWS = path.includes('/ws-');
  
    const proxyPathConfiguration = {
      target,
      secure: false,
      changeOrigin: true,
    };
  
    if (isWS) {
      proxyPathConfiguration.pathRewrite = {
        [`^${path}`]: '',
      };
    }
  
    return proxyPathConfiguration;
  };
  
  const proxy = {};
  if (process.env.PROXY_REQUEST_PATH && process.env.PROXY_REQUEST_TARGET) {
    const proxyRequestPath = JSON.parse(`[${process.env.PROXY_REQUEST_PATH}]`);
    const proxyRequestTarget = JSON.parse(`[${process.env.PROXY_REQUEST_TARGET}]`);
  
    for (let i = 0; i < proxyRequestPath.length; i += 1) {
      proxy[proxyRequestPath[i]] = createProxyConfiguration(
        proxyRequestPath[i],
        proxyRequestTarget[i],
      );
    }
  }
  
  module.exports = proxy;
  