

mvcc：多并发版本控制，为了解决多并发加锁太重的一个方式。做到读写冲突时，不加锁也不阻塞

当前读：读取当前最新的数据（需要加锁）select lock in share mode(共享锁), select for update ; update, insert ,delete(排他锁)

快照读：不加锁的select





mysql可见性算法伪代码

```java
// 快照读
private static class ReadView{
    // 当前事务ID
    public int current_trx_id;
    // 正在活跃的事务id（未提交的事务）
    public List<Integer> alive_list;
    // 最小事务id
    public int low_limit_id;
    // 目前已出现的事务ID的最大值 + 1
    public int up_limit_id;
}

private static class UndoLog{
    // 当前指针
    public String roll_ptr;
    // 隐含的自增ID
    public int db_row_id;
    // 事务ID
    public int trx_id;
    // 回滚指针
    public UndoLog db_roll_ptr;
}

// 快照读
private static UndoLog readData(UndoLog chain, ReadView readView) {
    UndoLog current = chain;
    while (true) {
        if(visibility(chain, readView)) {
            return current;
        }
        current = chain.db_roll_ptr;
    }
}

private static boolean visibility(UndoLog undoLog, ReadView readView) {
    // 事务已提交或当前事务 可见
    if(undoLog.trx_id < readView.low_limit_id || undoLog.trx_id == readView.current_trx_id) {
        return true;
    }
    // 当前事务在活跃事务后查询 不可见
    if(readView.current_trx_id > undoLog.trx_id) {
        return false;
    }
    // 活跃事务id里面包含当前事务不可见
    return !readView.alive_list.contains(undoLog.trx_id);
}


```

