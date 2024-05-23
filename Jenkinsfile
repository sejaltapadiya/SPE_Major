pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/sejaltapadiya/SPE_Major.git'
    }

    stages {
        stage('Cleanup') {
            steps {
                script {
                    sh 'docker rm -f prosepetals-frontend || true'
                    sh 'docker rm -f prosepetals-backend || true'
                    sh 'docler rm -f database-container || true'
                    sh 'docker network rm prosepetals-network || true'
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: "${GITHUB_REPO_URL}"
                }
            }
        }
        stage('Create Network') {
            steps {
                sh 'docker network create prosepetals-network'
                sleep 10
            }
        }
         stage('Maven Build') {
            steps {
                 dir('./BACKEND/ProsePetal') {
                     sh "mvn clean package"
                     sh "mvn clean install"
                 }
             }
         }

        stage('Build Docker Images') {
            steps {
                script {
                    dir('./BACKEND/ProsePetal') {
                        docker.build("sejal28/prosepetals-backend", '.')
                    }
                    dir('./FRONTEND') {
                        docker.build("sejal28/prosepetals-frontend", '.')
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker push sejal28/prosepetals-frontend:latest'
                        sh 'docker push sejal28/prosepetals-backend:latest'
                    }
                }
            }
        }

        stage('Start Docker Compose stack') {
        steps {
            script {
                sh 'docker rm -f database-container prosepetals-backend prosepetals-frontend|| true' // Remove the conflicting container if exists
                sh 'docker-compose up -d' // Start the Docker Compose stack
            }
        }
    }
}

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for more details.'
        }
    }
}
