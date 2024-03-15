class JSGlobalVariablePlugin {
  constructor(options) {
    this.options = options || {}
  }

  apply(compiler) {
    compiler.hooks.emit.tap('JSGlobalVariablePlugin', (compilation) => {
      // 找到所有入口
      const entrypoints = compilation.entrypoints
      for (let entrypoint of entrypoints) {
        // 找到相关的chunk
        const chunks = entrypoint[1].chunks
        chunks.forEach(chunk => {
          // 找到相关的文件
          const files = chunk.files
          files.forEach(file => {
            const assets = compilation.assets
            // 获取文件的内容
            const content = assets[file].source()
            const define = this.generate()
            // 用新内容去替换
            const newContent = `${define}\n${content}`
            assets[file] = {
              source() {
                return newContent
              },
              size() {
                return newContent.length
              }
            }
          })
        })
      }
    })
  }

  generate() {
    const prefix = JSON.stringify(this.options);
    return `window.options = ${prefix}`
  }
}

module.exports = { JSGlobalVariablePlugin }