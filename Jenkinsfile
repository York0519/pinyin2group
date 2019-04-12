pipeline {
  agent {
    node { label 'master' }
  }

  environment {
    NODEJS_ORG_MIRROR = 'https://npm.taobao.org/mirrors/node'
    DINGDING_ROBOT_URL = 'https://oapi.dingtalk.com/robot/send?access_token=3694474567a64dcf6fca101424acb325f6f54ce5da5a69c3e590cc6b98dba3c4'
  }

  stages {
    stage('在docker构建') {
      agent {
        docker {
          image 'node:10-alpine'
          args '-v $MASTER_WORKSPACE:$MASTER_WORKSPACE'
        }
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
