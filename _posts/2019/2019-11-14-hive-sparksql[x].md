## spark
https://spark.apache.org/docs/2.3.0/api/sql/#date_format


## hive
https://cwiki.apache.org/confluence/display/Hive/LanguageManual+UDF

date_format(date/timestamp/string ts, string fmt)	

Converts a date/timestamp/string to a value of string in the format specified by the date format fmt (as of Hive 1.2.0). Supported formats are Java SimpleDateFormat formats – https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html. The second argument fmt should be constant. Example: date_format('2015-04-08', 'y') = '2015'.

date_format can be used to implement other UDFs, e.g.:

dayname(date) is date_format(date, 'EEEE')
dayofyear(date) is date_format(date, 'D')



### c#循环移除列表元素

https://stackoverflow.com/questions/1582285/how-to-remove-elements-from-a-generic-list-while-iterating-over-it