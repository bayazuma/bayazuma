module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.module.rules.push(
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'glslify-loader',
          },
        ],
      }
    )

    // Important: return the modified config
    return config
  },
}
