
```bash
#!/bin/bash

# 查找当前目录下所有zip文件
zip_files=$(find $1 -name "*.jar")

# 检查每个zip文件中是否含有目标文件
for file in $zip_files
do
    if unzip -l "$file" | grep -q "$2"
    then
        echo "File found in $file"
    fi
done
```


小工具， 查找项目下所有jar中是否包含某个文件。

使用示例：

1. save as `find-spring.sh`, save to ~/bin
2. chmod +x find-spring.sh
3. cd  target dir
4. `find-spring.sh ./ spring.factories`，查找所有包含spring自动注入配置的jar包
5. `find-spring.sh ./ stringutil` 所有名字or路径中充包含util的