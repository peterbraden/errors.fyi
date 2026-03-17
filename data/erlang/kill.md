---
name: "kill"
description: "An untrappable exit signal sent via `exit(Pid, kill)`. A process receiving this signal is unconditionally terminated; even processes trapping exits cannot catch it. The resulting exit reason becomes `killed`."
references:
  - https://www.erlang.org/doc/reference_manual/processes.html#signals
  - https://www.erlang.org/doc/man/erlang.html#exit-2
---
