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

        stage('Maven Build') {
            tools {
                maven 'Maven' // This should match the name configured in Jenkins
            }
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
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker push sejal28/prosepetals-frontend:latest'
                        sh 'docker push sejal28/prosepetals-backend:latest'
                    }
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'Playbook.yml',
                        inventory: 'Inventory'
                    )
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
