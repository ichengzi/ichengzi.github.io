The Mail service can send email messages to one or more recipients. A message contains **a subject, a plaintext body, and an optional HTML body**. It can also contain **file attachments** and **a limited set of headers**.

- 邮件服务可以发送邮件到一个或多个收件人
- Message 包含一个 主题， 一个plaintext 块，一个可选的 html块
- Message 也可以包含附件
- Message 也可以包含 header 集合（有限的）

When an application calls the Mail service to send a message, the message is queued, and **the call returns immediately**. The Mail service uses **standard procedures for contacting each recipient's mail server, delivering the message**, and retrying if the mail server cannot be contacted.

- 当app调用 mail service 时， message 被放到 队列中，然后调用return，调用结束。


