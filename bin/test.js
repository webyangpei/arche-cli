#!/usr/bin/env node

// 这是用来编写指令和处理命令行的，具体用法如下
const program = require('commander');
// 这是用来修改控制台输出内容样式的，比如颜色啊，具体用法如下：
const chalk = require('chalk');
// 这是一个好看的加载，就是你下载的时候会有个转圈圈的那种效果，用法如下：
const ora = require('ora');
// 这是用来下载远程模板的，支持 GitHub、 GitLab 和 Bitbucket 等，用法如下
const download = require('download-git-repo');
// 获取template.json  配置
const tplObj = require(`${__dirname}/../template`)

program.
  usage('<template-name> [project-name]')

program.parse(process.argv)

// 当用户没有输入参数时 给出提示
if(program.argv.length < 1) return program.help()

// 第一个参数 模版名称 / 好比 vue init webpack project-name 的命令一样，第一个参数是 webpack，第二个参数是 project-name
let templateName = program.argv[0]
// 第二个参数名称 工程名
let projectName = program.argv[1]

// 参数校验 模版名称需存在
if (!tplObj[templateName]) {
  console.log(chalk.red('\n Template does not exit! \n'))
  return
}

// 工程需存在
if(!projectName) {
  console.log(chalk.red('\n Project should not be empty! \n'))
  return
}

url = tplObj[templateName]

console.log(chalk.white('\n Start generating... \n'))

// 出现加载图标 开始下载模版
const spinner = ora("Downloading...");
// 开始转圈
spinner.start();
// 开始下载
download(url, projectName,
  err => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(`Generation failed. ${err}`))
      return
    }
    // 结束加载图标
    spinner.succeed();
    console.log(chalk.green('\n Generation completed!'))
    console.log('\n To get started')
    console.log(`\n    cd ${projectName} \n`)
  })



