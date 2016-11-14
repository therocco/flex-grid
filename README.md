# `<flex-grid>` Custom Element
An easy to use flexbox grid element built using HTML Custom Elements v1 spec.

### Attributes
- `col` - `{number}` Number of columns to use for grid (default `12`).
- `sm` - `{number}` Number of columns to span in small viewport (default `1`)
- `md` - `{number}` Number of columns to span in medium viewport (default `1`)
- `lg` - `{number}` Number of columns to span in large viewport (default `1`)

### Usage
```html
<flex-grid>
    <div>flex</div>
    <div>flex</div>
    <div>flex</div>
    <div>flex</div>
    <flex-grid sm="12" md="6" lg="6">
        <div md="12">12</div>
        <div md="6">6</div>
        <div md="6">6</div>
        <div md="8">8</div>
        <div md="4">4</div>
    </flex-grid>
</flex-grid>
```

-----------
#### Donate

- **BTC:** 1NerV6wXVnUZceTp5KUgHiwJt1Pqk7TDRT
- **ETH:** 0x98f7ff902157e1a3d1476e8fcfb843fdb3212b92
- **LSK:** 4214091785427732085L
