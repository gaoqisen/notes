```
@Aspect
@Component
@Slf4j
public class LogAspect implements Ordered {

    @Autowired
    private HttpServletRequest request;

    /**
     * 切点配置
     */
    @Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public void logMethodPointcut() {

    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.PostMapping)")
    public void logMethodPointcut2() {

    }

    @Around("logMethodPointcut() || logMethodPointcut2() ")
    public Object interceptor(ProceedingJoinPoint joinPoint) throws Throwable {

        // 切面打印日志
        long startTime = System.currentTimeMillis();
        Object result = null;
        long costTime = 0L;
        try {
            result = joinPoint.proceed(joinPoint.getArgs());
            costTime = System.currentTimeMillis() - startTime;
            return result;
        } catch (Throwable e) {
            throw e;
        } finally {
            log(joinPoint, result, costTime);// 记录响应日志
        }
    }

    /**
     * 记录日志
     * 
     * @param result 方法返回值
     * @param costTime 方法耗时(ms)
     */
    private void log(ProceedingJoinPoint joinPoint, Object result, long costTime) {
        try {
            // 当前执行方法参数
            String methodName = joinPoint.getSignature().getName();
            String className = joinPoint.getTarget().getClass().getName();
            String url = request.getRequestURI();
            log.info("url:{}, method:{}.{}() header:{},param:{},return:{},cost:{} ms", url, className, methodName, HeaderThreadLocal.getHeader(), joinPoint.getArgs(), result, costTime);
        } catch (Exception e) {
            log.error("", e);
        }
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
```