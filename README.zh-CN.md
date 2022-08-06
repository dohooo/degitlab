[English](./README.md) | 简体中文

# degitlab

> 🫥 Degit的gitlab私有托管版本。

### 配置

私有化部署的gitlab通常需要身份验证，所以我们需要配置personal access token。
*如果你已经在本地登录，那你不需要再次配置*
```
# ~/.gitconfig

[core]
  degitlabPAT = <personal access token>
  degitlabHost = <host>
```

### 使用

```
// 使用项目id克隆全部项目，并自动过滤.git目录。
degitlab -i 1016

// 指定输出路径，默认为当前目录。
degitlab -i 1016 -o ./dist

// 指定子目录，进行部分克隆。
degitlab -i 1016 -o ./dist -s /src/index.ts

// 指定多个子目录。
degitlab -i 1016 -o ./dist -s /src/index.ts -s /src/index2.ts

// 帮助。
degitlab -h
```

## 赞助商

<p align="center">
  <img src='https://github.com/dohooo/sponsors/blob/master/sponsors.png?raw=true'/>
</p>

## 许可

[MIT](./LICENSE) License © 2022 [Dohooo](https://github.com/dohooo)
