pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t kittychan-ui .'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'docker rm kittychan-ui --force'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'docker run -p 3000:3000 -d --name kittychan-ui kittychan-ui'
            }
        }
    }
}