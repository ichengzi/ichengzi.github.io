`@SpringBootApplication`

等价于

```
@Configuration
@EnableAutoConfiguration
@ComponentScan
```


gae cron timer
==============
The App Engine Cron Service allows you to configure regularly scheduled tasks that operate at defined times or regular intervals. These tasks are commonly known as cron jobs. **These cron jobs are automatically triggered by the App Engine Cron Service**. For instance, you might use a cron job to send out an email report on a daily basis, or to update some cached data every 10 minutes, or refresh summary information once an hour.


The handler can be as simple as a Servlet in the app. **The Servlet URL mapping in web.xml** should be the same as the cron job URL.(无spring时，url映射是通过 `web.xml` 中的配置完成的)

**exceeded the time deadline,**（超过时限）


## Cloud Datastore

Concept | Cloud Datastore | Relational database
--------|-----------------|--------------------
Category of object | Kind | Table
One object | Entity | Row
Individual data for an object | Property | Field
Unique ID for an object | Key | Primary key

Unlike rows in a relational database table, **Cloud Datastore entities of the same kind can have different properties**, and **different entities can have properties with the same name but different value types**. These unique characteristics imply a different way of designing and managing data to take advantage of the ability to scale automatically. In particular, Cloud Datastore differs from a traditional relational database in the following important ways:

