## Mysql

### timestamp 毫秒精度
SELECT NOW(6)
SELECT CURRENT_TIMESTAMP(6)

### sql语句影响行数
* FOUND_ROWS() : select  // mysql功能函数
* ROW_COUNT()  : update delete insert // mysql功能函数

* `mysql_affected_rows() php中的概念` 返回最近一次与 连接句柄 关联的 INSERT，UPDATE 或 DELETE 查询所影响的记录行数。
* 如果连接句柄没有指定， 则默认使用最近一次由 mysql_connect() 函数打开的连接句柄。
* 如果你使用事务处理（transactions），你需要在 INSERT，UPDATE 或 DELETE 查询后调用 `mysql_affected_rows() `函数，而不是在 commit 命令之后。
* **如果最近一次操作是没有任何条件（WHERE）的 DELETE 查询， 在表中所有的记录都会被删除，但该函数返回值为 0**。
* **当使用 UPDATE 查询，MySQL 不会将原值和新值一样的列更新**。 这样使得` mysql_affected_rows()` 函数返回值不一定就是查询条件所符合的记录数。 **只有真正被修改的记录数才会被返回。**

### ExecuteNonQuery 
* 对于 UPDATE、INSERT 和 DELETE 语句，返回值为该命令所影响的行数。
* 对于所有其他 DML 语句，返回值都为 -1。
* 对于 DDL 语句，比如 CREATE TABLE 或 ALTER TABLE，返回值为 0。

You can use the ExecuteNonQuery to perform **catalog operations** (for example, querying the structure of a database or creating database objects such as tables), or to **change the data** in a database without using a DataSet by executing UPDATE, INSERT, or DELETE statements.

Although the ExecuteNonQuery returns no rows, **any output parameters or return values mapped to parameters** are populated with data.

**For UPDATE, INSERT, and DELETE statements**, the return value is the number of rows affected by the command. When a trigger exists on a table being inserted or updated, the return value includes the number of rows affected by both the insert or update operation **and the number of rows affected by the trigger or triggers**. **For all other types of statements, the return value is -1**. 

**If a rollback occurs, the return value is also -1**.

### 2019-11-12-mysql-or-vs-union-all
https://stackoverflow.com/questions/13750475/sql-performance-union-vs-or

https://bertwagner.com/2018/02/20/or-vs-union-all-is-one-better-for-performance/

https://dev.mysql.com/doc/refman/8.0/en/union.html
https://dev.mysql.com/doc/refman/5.5/en/show-profile.html
http://www.mysqltutorial.org/sql-union-mysql.aspx
https://www.iteye.com/blog/xianglp-869892


### mysql 字段类型转换

varchar to datetime转换

