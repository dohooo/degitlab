English | [简体中文](./README.zh-CN.md)

# degitlab

> 🫥 Helps you easily clone project files for self-managed GitLab.

### Configuration

Since self-managed git usually come with authentication, so we need to add personal access token.  
*You don't need to set it if you have already logged in locally.*
```
# ~/.gitconfig

[core]
  degitlabPAT = <personal access token>
  degitlabHost = <host>
```

### Usage


```
// Use the project name to clone the project and automatically filter the .git directory.
degitlab -n degitlab

// Specify the path to clone, default is current directory.
degitlab -n degitlab -o ./dist

// Filter the directory.
degitlab -n degitlab -o ./dist -f /src/index.ts

// Filter the multiple directories.
degitlab -n degitlab -o ./dist -f /src/index.ts -f /src/index2.ts

// Help.
degitlab -h
```

## Sponsors

<p align="center">
  <img src='https://github.com/dohooo/sponsors/blob/master/sponsors.png?raw=true'/>
</p>

## License

[MIT](./LICENSE) License © 2022 [Dohooo](https://github.com/dohooo)
