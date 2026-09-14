---
name: "Device-Side Assert Triggered"
numeric: 710
description: "An assert() triggered in device code during kernel execution, corrupting the CUDA context. A very common cause is an out-of-bounds index (e.g. an embedding or indexing op) inside a GPU-accelerated ML framework."
references:
  - https://docs.nvidia.com/cuda/cuda-runtime-api/group__CUDART__TYPES.html
---
