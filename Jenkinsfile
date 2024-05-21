pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/sejaltapadiya/SPE_Major.git'
        DOCKER_CREDENTIALS_ID = 'DockerHubCred'
    }

    stages {
        stage('Cleanup') {
            steps {
                script {
                    sh 'docker rm -f prosepetals-frontend || true'
                    sh 'docker rm -f prosepetals-backend || true'
                    sh 'docker rm -f database-container || true'
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
                script {
                    def networkExists = sh(script: 'docker network inspect prosepetals-network > /dev/null 2>&1', returnStatus: true) == 0
                    if (!networkExists) {
                        sh 'docker network create prosepetals-network'
                    }
                }
            }
        }

        stage('Maven Build') {
            steps {
                dir('./BACKEND/ProsePetal') {
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
                    retry(3) {
                        docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                            sh 'echo "$DOCKERHUB_PASSWORD" | docker login -u sejal28 --password-stdin'
                            sh 'docker push sejal28/prosepetals-frontend:latest'
                            sh 'docker push sejal28/prosepetals-backend:latest'
                        }
                    }
                }
            }
        }

        stage('Start Docker Compose stack') {
            steps {
                script {
                    sh 'docker-compose up -d' // Start the Docker Compose stack
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up temporary files and containers...'
            sh 'docker system prune -f || true'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for more details.'
        }
    }
}
