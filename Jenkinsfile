#!groovy

def tryStep(String message, Closure block) {
  try {
    block()
  }
  catch (Throwable t) {
    slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-chappie', color: 'danger'
    // slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'
    throw t
  }
}

node {
  // stage("Checkout") {
  //     checkout scm
  // }
  stage("Build image") {
    tryStep "Build image", {
      docker
        .build("build.app.amsterdam.nl:5000/ois/vergunningschecker:${env.BUILD_NUMBER} . ")
        .push()
    }
  }
}
