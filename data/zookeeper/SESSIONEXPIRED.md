---
name: "Session Expired"
description: "The client session has been expired by the server, typically because the client failed to send a heartbeat within the session timeout window. The client must create a new ZooKeeper handle to reconnect; ephemeral nodes owned by the expired session have been deleted."
references:
  - https://zookeeper.apache.org/doc/current/apidocs/zookeeper-server/org/apache/zookeeper/KeeperException.SessionExpiredException.html
  - https://zookeeper.apache.org/doc/current/zookeeperProgrammers.html#ch_zkSessions
---
