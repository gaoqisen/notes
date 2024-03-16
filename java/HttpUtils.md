```java
public class HttpUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(HttpUtils.class);

    public HttpUtils() {
    }

    public static String post(String str, Map<String, String> params, int timeoutMs) throws Exception {
        HttpURLConnection httpConn = null;
        OutputStream outputStream = null;
        InputStream inputStream = null;

        try {
            URL url = new URL(str);
            httpConn = (HttpURLConnection)url.openConnection();
            httpConn.setDoOutput(true);
            httpConn.setDoInput(true);
            httpConn.setUseCaches(false);
            httpConn.setRequestMethod("POST");
            httpConn.setConnectTimeout(timeoutMs);
            httpConn.setReadTimeout(timeoutMs);
            httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            httpConn.setRequestProperty("Connection", "Keep-Alive");
            httpConn.setRequestProperty("Charset", "UTF-8");
            outputStream = httpConn.getOutputStream();
            StringBuffer sbf = new StringBuffer("");
            Iterator var8 = params.keySet().iterator();

            String respBody;
            while(var8.hasNext()) {
                respBody = (String)var8.next();
                sbf.append("&").append(respBody).append("=").append(URLEncoder.encode((String)params.get(respBody), "UTF-8"));
            }

            IOUtils.write(sbf.toString().substring(1), outputStream, "UTF-8");
            IOUtils.closeQuietly(outputStream);
            int code = httpConn.getResponseCode();
            if (code >= 500) {
                respBody = IOUtils.toString(httpConn.getErrorStream(), "UTF-8");
                LOGGER.info("code : {} , error : {}", new Object[]{code, respBody});
            }

            inputStream = httpConn.getInputStream();
            respBody = IOUtils.toString(inputStream, "UTF-8");
            LOGGER.debug("code : {} , respBody : {}", new Object[]{code, respBody});
            String var10 = respBody;
            return var10;
        } catch (Exception var19) {
            throw var19;
        } finally {
            IOUtils.closeQuietly(outputStream);
            IOUtils.closeQuietly(inputStream);

            try {
                httpConn.disconnect();
            } catch (Exception var18) {
                var18.printStackTrace();
            }

        }
    }

    public static String get(String path, String params, int timeoutMs) throws Exception {
        InputStream inputStream = null;
        HttpURLConnection urlConnection = null;
        String content = "";
        if (StringUtils.isNotBlank(params)) {
            content = "?" + params;
        }

        try {
            URL url = new URL(path + content);
            urlConnection = (HttpURLConnection)url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setConnectTimeout(timeoutMs);
            urlConnection.setReadTimeout(timeoutMs);
            urlConnection.setUseCaches(false);
            urlConnection.setDoOutput(true);
            urlConnection.connect();
            int respCode = urlConnection.getResponseCode();
            if (200 == respCode) {
                inputStream = urlConnection.getInputStream();
                String ret = IOUtils.toString(inputStream, "UTF-8");
                LOGGER.debug("code : {} , respBody : {}", new Object[]{respCode, ret});
                String var9 = ret;
                return var9;
            }

            LOGGER.error("HTTP GET ERROR ! URL: " + path + content + " ,code:" + respCode);
        } catch (Exception var13) {
            throw var13;
        } finally {
            IOUtils.closeQuietly(inputStream);
            if (urlConnection != null) {
                urlConnection.disconnect();
            }

        }

        return null;
    }

    public static String getAndRetry(String url, String params, int timeoutMs, int currentTimes, int retryTimes) throws Exception {
        try {
            return get(url, params, timeoutMs);
        } catch (Exception var6) {
            ++currentTimes;
            LOGGER.warn("CurrentTimes: {} - request fail: {}  params:{}", new Object[]{currentTimes, url, params});
            if (retryTimes - currentTimes > 0) {
                TimeUnit.SECONDS.sleep(2L);
                return getAndRetry(url, params, timeoutMs, currentTimes, retryTimes);
            } else {
                throw var6;
            }
        }
    }
}
```