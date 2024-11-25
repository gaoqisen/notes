---
title: java一些常用的工具
date: 2020-08-16 20:50:11
tags: java base
categories: java
keywords: java base
description: 记录一些新的语法和自己不经常使用的方法，方便自己以后使用
---

## 一、小工具

### 1.1 BeanCopier

拷贝两个对象,网上资料显示: BeanCopier的性能是PropertyUtils (apache-common)的504倍。PropertyUtils的性能是BeanUtils(apache-common)的1.71倍,因此对象的拷贝尽量使用BeanCopier。注意属性没有提供set方法，只是提供了get方法是会报错的，无法复制属性

```java
// 拷贝对象， 在create对象的时候会出现性能瓶颈，可以将创建的过程放在缓存中，方便直接获取
BeanCopier copier = BeanCopier.create(FromEntity.class, ToEntity.class, false);  
ToEntity to = new ToEntity();  
copier.copy(from, to, null);  
```

### 1.2 内存分页

```java
// 总条数
int totalRow = 101;
// 每页记录数
int pageSize = 20;
// 总页数
int totalPage = (totalRow - 1) / pageSize + 1;

for(int i = 0; i< totalPage; i++) {
	int start = i * pageSize;
	int end = Math.min((i + 1) * pageSize, totalRow);
}
```

### 1.3 分页助手

```java
@FunctionalInterface
public interface PageTemplateHelper {

    /**
     * 初始化模版
     * @param pageTemplateHelper 分页模版
     */
    static void init(PageTemplateHelper pageTemplateHelper) {
        pageTemplateHelper.start();
    }

    /**
     * 执行分页逻辑
     */
    default void start() {
        // 总条数
        int totalRow = 50;
        // 每页记录数
        int pageSize = 20;
        // 总页数
        int totalPage = (totalRow - 1) / pageSize + 1;
        for(int i = 0; i< totalPage; i++) {
            int total = execute(i + 1, pageSize);
            if(total != totalRow) {
                totalRow = total;
                totalPage = (totalRow - 1) / pageSize + 1;
            }
        }
    }

    /**
     * 执行分页后的业务逻辑
     *
     * @param page 当前页
     * @param pageSize 页面数量
     * @return 总页数
     */
    abstract int execute(int page, int pageSize);

}

// 使用方法,引入函数式方法
PageTemplateHelper.init((start, end) -> {
  System.out.println(start + ", " + end);
  return 100;
});
```

### 1.4 分表任务执行助手

配置
```java
@Slf4j
@Component
public class SlaveDbConfig implements InitializingBean {
    
    public final static Map<String, SqlSessionFactory> SLAVE_DS_FACTORY_MAP = Maps.newHashMap();
    
    @Autowired
    private AbstractDataSourceAdapter abstractDataSourceAdapter;
    
    @Autowired
    private SpringBootShardingRuleConfigurationProperties shardingRule;
    
    @Override
    public void afterPropertiesSet() throws Exception {
        initSlaveDsFactoryMap();
    }

    private void initSlaveDsFactoryMap() {
        log.info("init slave SqlSessionFactory begin");
        // 通过配置文件获取从库配置名
        List<String> slaveDsNames = getSlaveDsNames(shardingRule);
        // 获取所有数据库连接配置
        final Map<String, DataSource> dataSourceMap = abstractDataSourceAdapter.getDataSourceMap();
        Set<Entry<String, DataSource>> entries = dataSourceMap.entrySet();
        for (Entry<String, DataSource> entry : entries) {
            final String dsName = entry.getKey();
            // 从库配置不为空，并且不在从库里则不处理
            if (CollectionUtils.isNotEmpty(slaveDsNames)) {
                if (!slaveDsNames.contains(dsName)) {
                    continue;
                }
            }
            SqlSessionFactoryBean sqlSessionFactoryBean = getSqlSessionFactoryBean(entry);
            try {
                SLAVE_DS_FACTORY_MAP.put(dsName, sqlSessionFactoryBean.getObject());
            } catch (Exception e) {
                log.error("init slave SqlSessionFactory exception, dsName={}", dsName, e);
            }
            log.info("init slave SqlSessionFactory ok {}", dsName);
        }
        log.info("init slave SqlSessionFactory end");
    }
    
    private SqlSessionFactoryBean getSqlSessionFactoryBean(Entry<String, DataSource> entry) {
        final DataSource dataSource = entry.getValue();
        // 必须为每个数据源创建不同的SqlSessionFactory,不能移到for循环外
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sqlSessionFactoryBean.setConfigLocation(resolver.getResource("classpath:/META-INF/mybatis/mybatis-config.xml"));
        // 添加xml路径
        Resource[] resources = new Resource[]{resolver.getResource("classpath:/sql/CreditApplyMapper.xml"),
                resolver.getResource("classpath:/sql/TestMapper.xml")};
        sqlSessionFactoryBean.setMapperLocations(resources);
        return sqlSessionFactoryBean;
    }
    
    /**
     * 获取所有从库的 ds name
     */
    private List<String> getSlaveDsNames(SpringBootShardingRuleConfigurationProperties shardingRule) {
        List<String> slaveDsNames = new ArrayList<>();
        if (null == shardingRule) {
            return slaveDsNames;
        }
        Map<String, YamlMasterSlaveRuleConfiguration> masterSlaveRules = shardingRule.getMasterSlaveRules();
        if (MapUtils.isEmpty(masterSlaveRules)) {
            return slaveDsNames;
        }
        Set<Entry<String, YamlMasterSlaveRuleConfiguration>> entries = masterSlaveRules.entrySet();
        for (Entry<String, YamlMasterSlaveRuleConfiguration> entry : entries) {
            final YamlMasterSlaveRuleConfiguration yamlMasterSlaveRuleConfiguration = entry.getValue();
            slaveDsNames.addAll(yamlMasterSlaveRuleConfiguration.getSlaveDataSourceNames());
        }
        return slaveDsNames;
    }
}

```

模板

```java
@Slf4j
public abstract class BatchTaskSplitHandleTemplate<T> {
    private final Map<String, SqlSessionFactory> factoryMap;

    /**
     * 分表数量
     */
    private final int tableNum;

    private Class<T> type;

    public BatchTaskSplitHandleTemplate() {
        this.factoryMap = SlaveDbConfig.SLAVE_DS_FACTORY_MAP;
        this.tableNum = 128;

        Type superClass = this.getClass().getGenericSuperclass();
        if(superClass instanceof ParameterizedType) {
            ParameterizedType parameterizedType = (ParameterizedType) superClass;
            Type[] actualTypeArguments = parameterizedType.getActualTypeArguments();
            if(actualTypeArguments.length > 0) {
                this.type = (Class<T>)actualTypeArguments[0];
            }
        }
    }

    /**
     * 执行任务
     *
     * @param begin 开始时间
     * @param end 结束时间
     * @param database 数据库名
     * @param batchNum 批次处理数量
     */
    public void executeTake(Date begin, Date end, String database, Integer batchNum){
        final Set<Map.Entry<String, SqlSessionFactory>> entries = factoryMap.entrySet();
        T dynamicMapper;
        SqlSessionFactory sqlSessionFactory;
        for (Map.Entry<String, SqlSessionFactory> entry : entries) {
            final String dsName = entry.getKey();
            if (StringUtils.isNotBlank(database) && !StringUtils.equals(database, dsName)) {
                continue;
            }
            sqlSessionFactory = factoryMap.get(dsName);
            if (Objects.isNull(sqlSessionFactory)) {
                log.info("执行任务 break:{}", dsName);
                continue;
            }
            dynamicMapper = SqlSessionManager.newInstance(sqlSessionFactory).getMapper(type);
            Long maxId = 0L;
            for (Integer tableIndex = 0; tableIndex < tableNum; tableIndex++) {
                while (true) {
                    log.info("datasource={} tableIndex={} maxId={} begin", dsName, tableIndex, maxId);
                    Long id = businessHandle(batchNum, tableIndex, maxId, dynamicMapper, begin, end);
                    maxId = Objects.isNull(id) ? 0L : id;
                    if (maxId == 0) {
                        log.info("datasource={} tableIndex={} end", dsName, tableIndex);
                        break;
                    }
                    log.info("datasource={} tableIndex={} maxId={} processing", dsName, tableIndex, maxId);
                }
            }
        }
    }

    /**
     * 业务处理抽象方法
     *
     * @param batchNum 限制数量
     * @param tableIndex 表索引
     * @param maxId 当前处理最大业务ID
     * @param mapper 表mapper
     * @param begin 开始时间
     * @param end 结束时间
     * @return 下一次处理的业务ID
     */
    public abstract Long businessHandle(Integer batchNum, Integer tableIndex, Long maxId, T mapper, Date begin, Date end);

}
```

使用样例
```java

<select id="selectByTableIndexAndExample" parameterType="map"
        resultMap="com.oppo.finance.pandora.admin.dao.mysql.mapper.TestMapper.BaseResultMap">
    select
        *
    from loan_apply_${tableIndex} limit ${example.startIndex} , ${example.pageSize}
</select>


@Slf4j
@Component
public class DemoService extends BatchTaskSplitHandleTemplate<TestExpandMapper> {


    @Override
    public Long businessHandle(Integer batchNum, Integer tableIndex, Long maxId,
                               TestExpandMapper mapper, Date begin, Date end) {
        DzTestExample example = new DzTestExample();
        example.createCriteria()
                .andIdGreaterThan(maxId)
                .andCreateTimeBetween(begin, end);
        example.limit(0, batchNum);
        example.setOrderByClause("id ASC");
        List<Test> TestList = mapper.selectByTableIndexAndExample(tableIndex, example);
        if (CollectionUtils.isEmpty(TestList)) {
            return 0L;
        }


        return TestList.stream().max(Comparator.comparing(Test::getId)).orElse(new Test()).getId();
    }
}


public class DemoServiceTest extends BaseTest {
    
    @Autowired
    private DemoService demoService;
    
    @Test
    public void test() {
        DateTime now = DateTime.now();
        Date yesterday = now.minusDays(50).toDate();
        Date today = now.toDate();
        demoService.executeTake(yesterday, today, "database",100);
    }
}
```


## 二、字符处理

### 2.1 字符替换

```java
// Hi,666
String.format("Hi,%s", "666");
//f的使用  
System.out.printf("年-月-日 时:分:秒  %tF%n %tT%n",new Date());  
```

### 2.2 忽略全角半角方法

```java
   /**
     转半角的函数(DBC case)<br/><br/>
     全角空格为12288，半角空格为32
     其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
     * @param input 任意字符串
     * @return 半角字符串
     *
     */
    public static String toDbc(String input) {
        if(UT.Str.isNullOrEmpty(input)) {
            return null;
        }
        char[] c = input.toCharArray();
        for (int i = 0; i < c.length; i++) {
            if (c[i] == 12288) {
                //全角空格为12288，半角空格为32
                c[i] = (char) 32;
                continue;
            }
            if (c[i] > 65280 && c[i] < 65375) {
                //其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
                c[i] = (char) (c[i] - 65248);
            }
        }
        return new String(c);
    }
```

### 2.3 获取小数位数

```java
BigDecimal bd = new BigDecimal("3.1002000"); 
bd = BigDecimal.valueOf(bd.doubleValue()); 
System.out.println(bd.scale());
```

### 2.4 将指定数据放到第一位

```java
    private static void specifyChannelFirst(List<InfoDto> list, String channelCode) {
        list.sort((a, b) -> {
            if (a.getChannelCode().equals(channelCode)) {
                return -1;
            } else if (b.getChannelCode().equals(channelCode)) {
                return 1;
            } else {
                return 0;
            }
        });
    }
```

### 2.5 一些技巧
```
1、分库分表场景，定时任务需要扫数据：获取从库的所有数据源（table_1, table_2...）,遍历数据源用id + limit查询并处理数据（limit 0, 10; limit 10, 10）
2、测试环境不够，本地环境启动联调方案：
 - 每个服务添加route-tag（local，test1，test2等）
 - http接口header传递route-tag=local
 - 网关根据header=local路由到对应服务
 - dubbo接口根据route-tag路由：服务提供者将标签写到zookeeper，消费者调用时根据标签过滤提供者进行路由，没找到路由到就降级使用没有tag的路由
 - rocketMq根据route-tag路由：tag方式、不同环境使用不同topic（SendMessageHook改写topic）、不同环境不同集群、同一个topci不同的ConsumerGroup、自定义AllocateMessageQueueStrategy实现灰度队列和正式队列的区分(将灰度label标记在灰度实例的ClientID中，并在分配队列时，将每个Broker的指定比例的前N个队列用于所有灰度消费者来进行分配)
 https://github.com/apache/rocketmq/issues/3265


```

## 三、一些命令

```shell
// 查看java运行程序的端口
jps
// 查看java线程
jstack 23606 > test.txt
// java性能分析
jstat -gc 23606
// 查看java内存
jmap -dump:format=b,file=test.bin 23579
// 查看汇编指令
javap -c filename
// java控制台
jconsole
// 查看jvm
jvisualvm
```

## 四、基础

### 4.1 java方法中参数的传递(java中只有值传递)：

- 一个方法不能修改一个基本数据类型的参数（即数值型或布尔型)(方法中改变基本类型数据，不会影响到之前的数据。相当于拷贝数据)

- 一个方法可以改变一个对象参数的状态。(对象: 方法中改变对象的数据，原始的对象的值会跟着改变。)

- 一个方法不能让对象参数引用一个新的对象

### 4.2 ==与equals的区别

== 判断的是是否是对象的地址，即判断连个对象是不是同一个地址。（基本数据类型对比的是值，引用数据类型对比的是对象地址）

equals 判断的是值是否相同（对象没有覆盖equals方法相当于== ，否则通过覆盖的equals判断对象的值是否相等）

- 如果对象需要用equals对比，需要重写equals方法。

- String 对象是重写过equals方法的，所有string的equals对比的是值。

- 当创建string类型对象的时候，虚拟机会在常量池中找是否有相同的对象，如果有就把它赋给当前引用，否则就新创建对象

### 4.3 hashCode与equals

- hashCode的作用就是获取哈西码。它实际返回的是一个int整数。这个哈西码的作用就是确定索引的位置（可以快速找到所需要的对象）。

- hashCode在map中的作用就是为了减少equals的执行次数,相应就提高了执行速度。

- 如果不同的对象拥有相同的hashCode值，他们也不一定是相等的。如果相同的情况下，就像HashSet一样，会使用equals去对比值是否相同。

## 五、事务

### 5.1 @transactional注解在什么情况下会失效

1. 只能应用到public修饰符上，其它修饰符不起作用，但不报错
2. 数据库引擎不支持事务(Mysql的MyISAM不支持事务)
3. 没有被 Spring 管理
4. 数据源没有配置事务管理器
5. 异常捕获之后不抛出。try{}catch(Exception e){}
6. @Transactional 注解属性 propagation 设置错误，如：`TransactionDefinition.PROPAGATION_SUPPORTS`：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。 `TransactionDefinition.PROPAGATION_NOT_SUPPORTED`：以非事务方式运行，如果当前存在事务，则把当前事务挂起。 `TransactionDefinition.PROPAGATION_NEVER`：以非事务方式运行，如果当前存在事务，则抛出异常。这3种设置都会滚。
7. @Transactional 注解属性 rollbackFor 设置错误（抛出异常如果不是运行时异常需要添加注解@Transactional(rollbackFor = Exception.class)）
8. 同一个类中方法调用，导致@Transactional失效。比如有一个类Test，它的一个方法A，A再调用本类的方法B（不论方法B是用public还是private修饰），但方法A没有声明注解事务，而B方法有。则外部调用方法A之后，方法B的事务是不会起作用的（只有当事务方法被当前类以外的代码调用时，才会由`Spring`生成的代理对象来管理）
