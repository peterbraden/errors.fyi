---
name: "No Children for Ephemerals"
description: "Ephemeral znodes cannot have children. Attempting to create a child node under an ephemeral node returns this error; restructure the data model to use persistent parent nodes."
references:
  - https://zookeeper.apache.org/doc/current/apidocs/zookeeper-server/org/apache/zookeeper/KeeperException.NoChildrenForEphemeralsException.html
---
