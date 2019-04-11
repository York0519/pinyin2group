pipeline {
  agent any

  environment {
    NODEJS_ORG_MIRROR = 'https://npm.taobao.org/mirrors/node'
    DINGDING_ROBOT_URL = 'https://oapi.dingtalk.com/robot/send?access_token=74b5d3343b5d905288781d698a10241fd81c3aa2ca57bbff808dfa3494363b4e'
  }

  stages {
    stage('Initialization') {
      steps {
        echo 'Start installing dependencies'
        sh 'npm install'
        sh "npm version preminor --preid=${BUILD_NUMBER}"
        script {
          env.PACKAGE_VERSION = sh(returnStdout: true, script: 'node -pe "require(\'./package.json\').version.trim()"').trim()
          env.PACKAGE_NAME = sh(returnStdout: true, script: 'node -pe "require(\'./package.json\').name.trim()"').trim()
        }
      }
    }


    stage('Check code') {
      steps {
        echo 'Begin execution tslint'
        sh 'npm run lint'
      }
    }

    stage('Build') {
      steps {
        echo 'Start building'
        sh 'npm run build'
      }
    }
    stage('Bublish') {
      steps {
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
  def title = "${env.JOB_NAME} Build fails [${env.BUILD_NUMBER}]"
  def markdown = "### ${title}\n #### New features ${changes} \n #### Summary > buildUrl: ${env.BUILD_URL} \n > [Click to view](${env.BUILD_URL}/console)"
  return buildJSON(title, markdown)
}

def successNotifyData() {
  def changes = getChangeList()
  def title = "${env.JOB_NAME} Build success [${env.BUILD_NUMBER}]"
  def markdown = "### ${title}\n #### New features: \n ${changes} #### Installation method: \n > npm install ${env.PACKAGE_NAME}@${env.PACKAGE_VERSION} --save\n"
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
