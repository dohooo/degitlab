[English](./README.md) | 简体中文

# degitlab

> 🫥 **degitlab** -> **de-git-lab**  
> 非常快的获取私有化部署中的GitLab仓库备份。

### 原因

在私有化部署的GitLab中，我制作了一些代码模板，比如说ts-starter，它是一个基于TS的项目模版。它包含团队的开发规范配置和一些公司内部使用的特定配置，为了与其他同事分享，我不能把它放在Github。所以我把它放到了私有化部署的GitLab中，当我需要时，我可以运行 `degitlab -n ts-starter -o ./ts-project` ，这样我会非常快的获取一个不含任何历史记录的模板内容。  
在另一个场景中，我创建了一个包含不同IDE配置的仓库，同样基于我们团队的开发规范，如果我使用VSCode，我可以运行 `degitlab -n ide -o .vscode -f .vscode` ，这样我会获取 `.VSCode` 目录到我的项目中，如果我使用其他IDE，同样我可以使用 `-f` 来过滤这个项目中任何一份配置，这个工具对于项目的标准化与开发效率的提升会很有帮助。

### 工作方式

当你执行 `degitlab -n some-group/some-repo -o ./` 后, 它会寻找在远端最新的提交，并且下载对应的压缩包文件到 `./`。（这会比使用 `git clone` 快非常多，因为你不需要下载整个历史，并且文件已经被压缩过，体积会很小）。 

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
