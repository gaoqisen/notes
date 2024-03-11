```
@Slf4j
@Component
public class AsyncManager {

    @Resource
    private Executor executorService;

    /**
     * 无返回值的异步任务提交
     *
     * @param taskFun
     * @param fn      异常补偿函数
     */
    public void doAsyncWithoutResult(Consumer<?> taskFun, Function<Throwable, ? extends Void> fn) {
        doAsyncWithResult(() -> {
            taskFun.accept(null);
            return null;
        }, fn);
    }

    /**
     * 有返回值的异步任务提交
     *
     * @param taskFun
     * @param fn
     * @param <T>
     * @return
     */
    public <T> CompletableFuture<T> doAsyncWithResult(Supplier<T> taskFun, Function<Throwable, ? extends T> fn) {
        return doAsyncWithResult(executorService, taskFun, fn, false);
    }

    /**
     * 有返回值的异步任务提交
     *
     * @param taskFun 业务函数
     * @param fn      业务异常补偿函数
     * @param isThrow 是否向上层抛出异常
     * @param <T>
     * @return
     */
    public <T> CompletableFuture<T> doAsyncWithResult(Executor executorParam, Supplier<T> taskFun, Function<Throwable, ? extends T> fn, final boolean isThrow) {
        final String threadName = ThreadUtil.getThreadName();
        final String headerStr = HeaderThreadLocal.getHeader();
        CompletableFuture<T> f = CompletableFuture.supplyAsync(() -> {
            log.info("异步操作start");
            threadInit(threadName, headerStr);
            try {
                return taskFun.get();
            } catch (Throwable throwable) {
                log.error("异步操作发生异常: ", throwable);
                T result = null;
                if (fn != null) {
                    result = fn.apply(throwable);
                }
                if (isThrow) {
                    // CompletionException类型的异常不会被CompletableFuture包装
                    throw new CompletionException(throwable);
                } else {
                    return result;
                }
            } finally {
                log.info("异步操作end");
                threadClean();
            }
        }, executorParam);
        return f;
    }

    private void threadClean() {
        ThreadUtil.clearMDC();
        HeaderThreadLocal.clean();
    }

    private void threadInit(String threadName, String headerStr) {
        ThreadUtil.initThreadName(threadName + "-sync");
        HeaderThreadLocal.setHeader(headerStr);
    }

    /**
     * 有返回值的异步任务提交
     *
     * @param taskFun
     * @param <T>
     * @return
     */
    public <T> CompletableFuture<T> doAsyncWithResultWithException(Supplier<T> taskFun, String channelCode) {
        return doAsyncWithResultWithException(executorService, taskFun, channelCode);
    }

    /**
     * 有返回值的异步任务提交
     *
     * @param taskFun 业务函数
     * @param <T>
     * @return
     */
    public <T> CompletableFuture<T> doAsyncWithResultWithException(Executor executorParam, Supplier<T> taskFun, String channelCode) {
        final String threadName = ThreadUtil.getThreadName();
        final String headerStr = HeaderThreadLocal.getHeader();
        CompletableFuture<T> f = CompletableFuture.supplyAsync(() -> {
            log.info("异步执行开始");
            threadInit(threadName, headerStr, channelCode);
            try {
                return taskFun.get();
            } catch (Throwable throwable) {
                log.warn("异步执行发生异常: ", throwable);
                // CompletionException类型的异常不会被CompletableFuture包装
                throw new CompletionException(throwable);
            } finally {
                log.info("异步执行结束");
                threadClean();
            }
        }, executorParam);
        return f;
    }

    private void threadInit(String threadName, String headerStr, String channelCode) {
        ThreadUtil.initThreadName(threadName + "-" + channelCode + "-sync");
        HeaderThreadLocal.setHeader(headerStr);
    }
}

```