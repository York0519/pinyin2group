pipeline {
  // agent {
  //   docker {
  //     image 'node:10-alpine'
  //   }
  // }
  agent any

  triggers {
    // 自动关联webhook
    GenericTrigger(
     genericVariables: [
        [key: 'ref', value: '$.ref'],   // 取post过来的json数值，格式为,refs/heads/develop
        [key: 'hookName', value: '$.hook_name'],    // 钩子名称，push_hooks, tag_push_hooks可以在码云勾选不同类型
        [key: 'projectPath', value: '$.project.path_with_namespace'] // 项目路径，区分不同路径 york17/pinyin2group
      ],
      causeString: 'Triggered on $ref',
      regexpFilterExpression: 'push_hooks#york17/pinyin2group2',    // 只在push代码到york17/pinyin2group的时候触发构建
      regexpFilterText: '$hookName#$projectPath',   // 模板字符串，会和regexpFilterExpression比较，匹配后才触发构建
      printContributedVariables: true,
      printPostContent: true
    )
  }

  environment {
    NODEJS_ORG_MIRROR = 'https://npm.taobao.org/mirrors/node'
    DINGDING_ROBOT_URL = 'https://oapi.dingtalk.com/robot/send?access_token=${DINGDING_TOKEN}'
  }

  stages {
    stage('初始化') {
      steps {
        echo '开始安装依赖'
        sh "npm version preminor --preid=${BUILD_NUMBER}"
        sh 'npm install'
        script {
          env.PACKAGE_VERSION = sh(returnStdout: true, script: 'node -pe "require(\'./package.json\').version.trim()"').trim()
          env.PACKAGE_NAME = sh(returnStdout: true, script: 'node -pe "require(\'./package.json\').name.trim()"').trim()
        }
      }
    }

    stage('检查代码') {
      steps {
        echo '开始执行 tslint'
        sh 'npm run lint'
      }
    }

    stage('发布') {
      steps {
        echo '开始发布'
        sh "echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > ~/.npmrc"
        sh 'npm publish'
      }
    }
  }

  post {
    success {
      script {
        def rawmsg = successNotifyData()
        sh "curl  ${env.DINGDING_ROBOT_URL} -H 'Content-Type:application/json' -X POST --data '${rawmsg}'"
      }
    }

    failure {
      script {
        def rawmsg = failNotifyData()
        sh "curl ${env.DINGDING_ROBOT_URL} -H 'Content-Type:application/json' -X POST --data '${rawmsg}'"
      }
    }
  }
}

def failNotifyData() {
  def changes = getChangeListByBuild(currentBuild)
  def title = "${env.JOB_NAME} 构建失败 [${env.BUILD_NUMBER}]"
  def markdown = "### ${title}\n #### 新增特性: ${changes} \n #### 摘要 > buildUrl: ${env.BUILD_URL} \n > [点击查看](${env.BUILD_URL}/console)"
  return buildJSON(title, markdown)
}

def successNotifyData() {
  def changes = getChangeList()
  def title = "${env.JOB_NAME} 构建成功 [${env.BUILD_NUMBER}]"
  def markdown = "### ${title}\n #### 新增特性: \n ${changes} #### 安装方式: \n > npm install ${env.PACKAGE_NAME}@${env.PACKAGE_VERSION} --save\n"
  return buildJSON(title, markdown)
}

def buildJSON(title, markdown) {
  return "{\"msgtype\":\"markdown\",\"markdown\":{\"title\":\"${title}\",\"text\":\"${markdown}\"}}"
}

def getChangeList() {
  def text = ""
  def build = currentBuild
  text += getChangeListByBuild(build)
  build = build.previousBuild
  while (build && build.resultIsWorseOrEqualTo("UNSTABLE")) {
    text += getChangeListByBuild(build)
    build = build.previousBuild
  }
  return text
}

def getChangeListByBuild(build) {
  def text = ""
  for (changeSetList in build.changeSets) {
    for (changeSet in changeSetList) {
      text += "- ${changeSet.author.fullName} [${changeSet.msg}](https://gitee.com/york17/pinyin2group/commit/${changeSet.commitId})\n"
    }
  }
  return text
}
