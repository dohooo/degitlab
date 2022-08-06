English | [简体中文](./README.zh-CN.md)

# degitlab

> 🫥 The self-managed gitlab version of degit.

### Configuration

Since self-managed git usually come with authentication, so we need to add personal access token.  
*You don't need to set it if you have already logged in locally.*
```
# ~/.gitconfig

[core]
  PAT = <personal access token>
  USERNAME = <username of self-managed git>
```

### Usage

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
