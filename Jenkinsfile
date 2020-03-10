#!groovy

def sendMessage(String message, String status, String color) {
  slackSend message: "${env.JOB_NAME}: ${message} ${status} ${env.BUILD_URL}", channel: "#ci-chappie", color: color
  slackSend message: "${env.JOB_NAME}: ${message} ${status} ${env.BUILD_URL}", channel: "#ci-channel", color: color
}

def tryStep(String message, Closure block) {
  try {
    block()
  } catch (Throwable t) {
    slackMessage message, "failure", "warning"
    throw t
  }
}

node {
  stage("Build image") {
    try {
      tryStep "Build graphql image", {
        docker
          .build("build.app.amsterdam.nl:5000/ois/chappie-graphql:${env.BRANCH_NAME}-${env.BUILD_NUMBER}", "-f ci/Dockerfile.graphql .")
          .push()
      }
      tryStep "Build client image", {
        docker
          .build("build.app.amsterdam.nl:5000/ois/chappie-client:${env.BRANCH_NAME}-${env.BUILD_NUMBER}", "-f ci/Dockerfile.client .")
          .push()
      }
    } catch (Throwable t) {
      slackSend "Build failed", "danger"
    } finally() {
      slackSend "Build succeeded", "success"
    }
  }
}
