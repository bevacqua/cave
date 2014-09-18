# cave

> Remove critical CSS from your stylesheet after inlining it in your pages

If you don't understand the purpose of this module, refer to [penthouse][1]

## Install

```shell
npm install cave --save
```

## API

The `cave` exposes a single function that takes the file path to a stylesheet and a string containing valid CSS you want to remove from the provided stylesheet.

### `cave(stylesheet, options, done)`

The `options` object contains the following properties.

Property | Description
---------|-----------------------------------------------------------------------
`css`    | The CSS rules to remove from the stylesheet. e.g: `a { color: #f00; }`

Cave will produce an AST and remove any matching rules, then the `done` callback will be executed.

## CLI

Cave works well with standard input.

```shell
cat path/to/file | cave <stylesheet> > slim.css
```

You can also pass in the critical CSS file as an option.

```shell
cave --css path/to/file <stylesheet> > slim.css
```

## License

MIT

[1]: https://github.com/pocketjoso/penthouse
