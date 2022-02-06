- `iptables-save` 将linux内核中的iptables表导出到标准输出设备。
- `iptables-save -t filter > iptables.bak`， filter 表规则导出到 iptables.bak文件。

- **iptables虽然可以配置域名白名单，但真正生效的是ip**