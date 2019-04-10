pipeline {
  agent any

  environment {
    NODEJS_ORG_MIRROR = 'https://npm.taobao.org/mirrors/node'
    DINGDING_ROBOT_URL = 'https://oapi.dingtalk.com/robot/send?access_token=74b5d3343b5d905288781d698a10241fd81c3aa2ca57bbff808dfa3494363b4e'
    BASH = '#!D:/Program files/Git/bin/bash.exe'
  }

  stages {
    stage('初始化') {
      steps {
        env.BASH
        echo '开始安装依赖'
        sh 'npm install'
        sh "npm version preminor --preid=${BUILD_NUMBER}"
        script {
          env.PACKAGE_VERSION = sh(returnStdout: true, script: 'node -pe "require(\'./package.json\').version.trim()"')
          env.PACKAGE_NAME = sh(returnStdout: true, script: 'node -pe "require(\'./package.json\').name.trim()"')
        }
      }
    }


    stage('检查代码') {
      steps {
        env.BASH
        echo '开始执行tslint'
        sh 'npm run lint'
      }
    }

    stage('构建') {
      steps {
        env.BASH
        echo '开始构建'
        sh 'npm run build'
      }
    }
    stage('发布') {
      steps {
        env.BASH
        sh 'npm publish'
      }
    }
  }

  post {
    success {
      script {
        env.BASH
        def rawmsg = successNotifyData()
        sh "curl  ${env.DINGDING_ROBOT_URL} -H 'Content-Type:application/json' -X POST --data '${rawmsg}'"
      }
    }

    failure {
      script {
        env.BASH
        def rawmsg = failNotifyData()
        sh "curl ${env.DINGDING_ROBOT_URL} -H 'Content-Type:application/json' -X POST --data '${rawmsg}'"
      }
    }
  }
}

def failNotifyData() {
  def changes = getChangeListByBuild(currentBuild)
  def title = "${env.JOB_NAME} 构建失败[${env.BUILD_NUMBER}]"
  def markdown = "### ${title}\n #### 新增特性 ${changes} \n #### 摘要 > buildUrl: ${env.BUILD_URL} \n > [点击查看](${env.BUILD_URL}/console)"
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
