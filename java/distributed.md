---
title: 分布式学习笔记
date: 2025-03-31 20:10:11
tags: distributed
categories: java
keywords: distributed
description: 分布式学习的一些笔记,还在记录中， 加油！
---

分布式系统的服务的特别多，会有如下问题
```
1、服务与服务之间如何通信
	- http、dubbo
2、其中一台服务挂了怎么办
	- 重试机制、心跳检测、降级、熔断 
3、这么多服务如何管理
	- 服务注册与发现、负载均衡
4、服务数据和接口的安全性问题
	- 网关、加解密
5、出现问题了如何排查问题
	- 链路追踪、ELK
6、其他单机不会有问题但是分布式需要考虑的问题
	- 分布式的事务问题
	- 分布式锁问题
	- 分布式 id 问题

```





## 一、服务与服务之间的通信问题



## 二、服务挂了怎么办（注册与发现）



## 三、服务之间的事务怎么处理

| **维度**     | **2PC**                      | **TCC**                      | **消息事务**                       |
| ------------ | ---------------------------- | ---------------------------- | ---------------------------------- |
| **阶段数**   | 两阶段（准备 + 提交 / 回滚） | 三阶段（Try+Confirm+Cancel） | 多阶段（半消息 + 本地事务 + 回查） |
| **实现依赖** | 数据库 XA 协议、协调者       | 业务服务实现补偿逻辑         | 消息队列的半消息机制               |
| **一致性**   | 强一致性                     | 最终一致性（允许短暂不一致） | 最终一致性                         |
| **性能**     | 较低（锁资源）               | 较高（无锁，但需业务改造）   | 较高（异步处理）                   |
| **适用场景** | 银行转账等高一致性场景       | 电商订单、支付等业务场景     | 订单支付与库存异步扣减等场景       |

- **阶段划分**：2PC 是**两阶段**；TCC 是**三阶段**；消息事务包含半消息、本地事务和回查等步骤，但核心逻辑可简化为 “预提交→确认 / 回滚”。
- **实现方式**：2PC 依赖数据库和协调者，TCC 依赖业务服务的补偿逻辑，消息事务依赖 MQ 的半消息和回查机制。
- **本质区别**：2PC 通过数据库锁保证强一致性，TCC 通过业务补偿实现最终一致，消息事务通过异步消息和重试机制达成最终一致。

### 2PC

```java
import java.util.ArrayList;
import java.util.List;

// 协调者类
class Coordinator {
    private List<Participant> participants;

    public Coordinator() {
        this.participants = new ArrayList<>();
    }

    public void addParticipant(Participant participant) {
        participants.add(participant);
    }

    public boolean twoPhaseCommit() {
        // 准备阶段
        boolean allPrepared = true;
        for (Participant participant : participants) {
            if (!participant.prepare()) {
                allPrepared = false;
                break;
            }
        }

        // 提交阶段
        if (allPrepared) {
            for (Participant participant : participants) {
                participant.commit();
            }
            return true;
        } else {
            for (Participant participant : participants) {
                participant.rollback();
            }
            return false;
        }
    }
}

// 参与者类
class Participant {
    public boolean prepare() {
        // 执行本地事务，但不提交
        System.out.println("Participant is preparing...");
        // 模拟准备成功
        return true;
    }

    public void commit() {
        System.out.println("Participant is committing...");
    }

    public void rollback() {
        System.out.println("Participant is rolling back...");
    }
}

// 测试类
public class TwoPhaseCommitExample {
    public static void main(String[] args) {
        Coordinator coordinator = new Coordinator();
        Participant participant1 = new Participant();
        Participant participant2 = new Participant();
        coordinator.addParticipant(participant1);
        coordinator.addParticipant(participant2);

        boolean result = coordinator.twoPhaseCommit();
        if (result) {
            System.out.println("Transaction committed successfully.");
        } else {
            System.out.println("Transaction rolled back.");
        }
    }
}
```



### TCC

```java
// 库存服务接口
interface InventoryService {
    boolean tryReduce(int productId, int quantity);
    boolean confirmReduce(int productId, int quantity);
    boolean cancelReduce(int productId, int quantity);
}

// 库存服务实现类
class InventoryServiceImpl implements InventoryService {
    @Override
    public boolean tryReduce(int productId, int quantity) {
        // 尝试扣减库存，预留资源
        System.out.println("Trying to reduce inventory for product " + productId + " by " + quantity);
        // 模拟尝试成功
        return true;
    }

    @Override
    public boolean confirmReduce(int productId, int quantity) {
        // 确认扣减库存
        System.out.println("Confirming inventory reduction for product " + productId + " by " + quantity);
        return true;
    }

    @Override
    public boolean cancelReduce(int productId, int quantity) {
        // 取消扣减库存，释放资源
        System.out.println("Canceling inventory reduction for product " + productId + " by " + quantity);
        return true;
    }
}

// 订单服务类
class OrderService {
    private InventoryService inventoryService;

    public OrderService(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    public boolean createOrder(int productId, int quantity) {
        // Try 阶段
        if (!inventoryService.tryReduce(productId, quantity)) {
            return false;
        }

        // Confirm 阶段
        if (!inventoryService.confirmReduce(productId, quantity)) {
            // 执行 Cancel 阶段
            inventoryService.cancelReduce(productId, quantity);
            return false;
        }

        return true;
    }
}

// 测试类
public class TCCExample {
    public static void main(String[] args) {
        InventoryService inventoryService = new InventoryServiceImpl();
        OrderService orderService = new OrderService(inventoryService);
        boolean result = orderService.createOrder(1, 10);
        if (result) {
            System.out.println("Order created successfully.");
        } else {
            System.out.println("Order creation failed.");
        }
    }
}
```



### 事务消息

```java
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.*;
import org.apache.rocketmq.common.message.Message;

// 事务监听器
class TransactionListenerImpl implements TransactionListener {
    @Override
    public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        // 执行本地事务，如处理支付
        System.out.println("Executing local transaction...");
        // 模拟本地事务成功
        return LocalTransactionState.COMMIT_MESSAGE;
    }

    @Override
    public LocalTransactionState checkLocalTransaction(MessageExt msg) {
        // 检查本地事务状态
        System.out.println("Checking local transaction...");
        return LocalTransactionState.COMMIT_MESSAGE;
    }
}

// 消息生产者类
public class MessageTransactionExample {
    public static void main(String[] args) throws MQClientException, InterruptedException {
        // 创建事务消息生产者
        TransactionMQProducer producer = new TransactionMQProducer("transaction_producer_group");
        // 设置 NameServer 地址
        producer.setNamesrvAddr("localhost:9876");
        // 设置事务监听器
        producer.setTransactionListener(new TransactionListenerImpl());
        // 启动生产者
        producer.start();

        // 创建消息
        Message message = new Message("TransactionTopic", "TransactionTag", "Hello, RocketMQ!".getBytes());
        // 发送半事务消息
        SendResult sendResult = producer.sendMessageInTransaction(message, null);
        System.out.println("Send result: " + sendResult);

        // 关闭生产者
        producer.shutdown();
    }
}
```



## 四、服务之间的缓存怎么处理



## 五、服务之间的安全



## 六、日志监控问题