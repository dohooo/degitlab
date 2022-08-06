English | [简体中文](./README.zh-CN.md)

# degitlab

> 🫥 The self-managed gitlab version of degit.

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
// Use the project ID to clone the project and automatically filter the .git directory.
degitlab -i 1016

// Specify the path to clone, default is current directory.
degitlab -i 1016 -o ./dist

// Filter the directory.
degitlab -i 1016 -o ./dist -s /src/index.ts

// Filter the multiple directories.
degitlab -i 1016 -o ./dist -s /src/index.ts -s /src/index2.ts

// Help.
degitlab -h
```

## Sponsors

<p align="center">
  <img src='https://github.com/dohooo/sponsors/blob/master/sponsors.png?raw=true'/>
</p>

## License

[MIT](./LICENSE) License © 2022 [Dohooo](https://github.com/dohooo)
