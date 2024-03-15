//打包前清空上次打包的文件
class CleanDistPlugin {
  // 一个类或对象必须拥有apply方法，webpack调用的入口
  apply(compiler) {
    //绑定Webpack构建周期中暴露的事件complier.hooks.someHook.tap("PluginName",()=>{})
    //这里需要在构建之前调用，因此利用beforeRun Hook

    //webpack内置的文件系统
    const fs = compiler.outputFileSystem;
    //获取打包路径output
    const outputPath = compiler.options.output.path;
    compiler.hooks.beforeRun.tap("CleanDistPlugin", (compiler) => {
      this.removeFileRecusive(fs, outputPath);
    })
  }

  removeFileRecusive(fs, outputPath) {
    // 读取目录下的内容，包括文件和文件夹
    const files = fs.readdirSync(outputPath)
    files.forEach(file => {
      const path = `${outputPath}/${file}`
      const fileStat = fs.statSync(path)
      // 判断是否为文件夹，如果是，则递归
      if (fileStat.isDirectory()) {
        this.removeFiles(fs, path)
      } else {
        //是文件，则删除
        fs.unlinkSync(path)
      }
    })
  }
}


module.exports = {
  CleanDistPlugin
}

