<!-- English | [简体中文](./README.zh-CN.md) -->

# degitlab

> 🫥 **degitlab** makes copies of gitlab repositories. When you run `degitlab -n some-group/some-repo -o ./`, it will find the latest commit on the remote and download the associated tar file to `./` if it doesn't already exist locally. (This is much quicker than using `git clone`, because you're not downloading the entire git history.)

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
