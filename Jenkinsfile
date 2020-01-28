#!groovy

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block()
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'

        throw t
    }
    finally {
        if (tearDown) {
            tearDown()
        }
    }
}

node {
    stage("Checkout") {
        checkout scm
    }
}

node {
    stage("Build acceptance image") {
        timeout(10) {
            def sttrKey = input(
                id: 'sttrKey', message: 'sttr key please...', parameters: [
                    [$class: 'TextParameterDefinition', defaultValue: 'mb', description: 'vbn', name: 'thakey']
                ]
            )
            echo ("The key is: " + sttrKey)
            
            tryStep "build", {
                def image = docker.build("build.app.amsterdam.nl:5000/ois/vergunningschecker:${env.BUILD_NUMBER}",
                    "--shm-size 1G " +
                    "--build-arg STTR_BUILDER_API_KEY=${sttrKey} " +
                    "--build-arg BUILD_ENV=acc " +
                    "--build-arg BUILD_NUMBER=${env.BUILD_NUMBER} " +
                    ". ")
                image.push()
            }
        }
    }
}


String BRANCH = "${env.BRANCH_NAME}"

if (BRANCH == "master") {

    node {
        stage('Push acceptance image') {
            tryStep "image tagging", {
                def image = docker.image("build.app.amsterdam.nl:5000/ois/vergunningschecker:${env.BUILD_NUMBER}")
                image.pull()
                image.push("acceptance")
            }
        }
    }

    node {
        stage("Deploy to ACC") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-vergunningschecker.yml'],
                ]
            }
        }
    }

    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'vergunningschecker is waiting for Production Release - please confirm'
        timeout(10) {
          input "Deploy to Production?"
        }
    }

    node {
        stage("Build and Push Production image") {
            tryStep "build", {
                def image = docker.build("build.app.amsterdam.nl:5000/ois/vergunningschecker:${env.BUILD_NUMBER}",
                    "--shm-size 1G " +
                    "--build-arg BUILD_NUMBER=${env.BUILD_NUMBER} " +
                    ".")
                image.push("production")
                image.push("latest")
            }
        }
    }

    node {
        stage("Deploy") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-vergunningschecker.yml'],
                ]
            }
        }
    }
}


if (BRANCH == "develop") {

    node {
        stage('Push acceptance image') {
            tryStep "image tagging", {
                def image = docker.image("build.app.amsterdam.nl:5000/ois/vergunningschecker:${env.BUILD_NUMBER}")
                image.pull()
                image.push("acceptance")
            }
        }
    }

    node {
        stage("Deploy to ACC") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-vergunningschecker.yml'],
                ]
            }
        }
    }
}

// if (BRANCH == "feature/sttr-checker") {
if (BRANCH == "feature/ready-for-acc") {

    node {
        stage('Push sttr-checker image') {

            tryStep "image tagging", {
                def image = docker.image("build.app.amsterdam.nl:5000/ois/vergunningschecker:${env.BUILD_NUMBER}")
                image.pull()
                image.push("acceptance")
            }
        }
    }

    node {
        stage("Deploy to ACC") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-vergunningschecker.yml'],
                ]
            }
        }
    }
}
