[English](./README.md) | 简体中文

# degitlab

> 🫥 Degit的gitlab私有托管版本。

### 配置

私有化部署的gitlab通常需要身份验证，所以我们需要配置personal access token。
*如果你已经在本地登录，那你不需要再次配置*
```
# ~/.gitconfig

[core]
  PAT = <personal access token>
  USERNAME = <用户名>
```

### 使用

```
degitlab -u https://gitlab.<xxxx>.com/<group>/<sub-group>/<repo-name>.git
// or
degitlab --help
```

## Sponsors

<p align="center">
  <img src='https://github.com/dohooo/sponsors/blob/master/sponsors.png?raw=true'/>
</p>

## License

[MIT](./LICENSE) License © 2022 [Dohooo](https://github.com/dohooo)
