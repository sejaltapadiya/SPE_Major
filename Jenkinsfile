pipeline {
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-jenkins')
    }
    agent any

    stages {
        stage('Git Pull') {
            steps {
                git branch: 'main', url: 'https://github.com/sejaltapadiya/SPE_Major.git'
            }
        }
        stage('Maven Build') {
            steps {
                dir('./BACKEND/ProsePetal') {
                    sh 'mvn clean install'
                }
                dir('./FRONTEND') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                dir('./BACKEND') {
                    // Build backend Docker image
                    sh 'docker build -t sejal28/prosepetals-backend .'
                }
                dir('./FRONTEND') {
                    // Build frontend Docker image
                    sh 'docker build -t sejal28/prosepetals-frontend .'
                }
            }
        }
        stage('Dockerhub Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-jenkins', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR')]) {
                    // Log in to Docker Hub
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    // Push backend Docker image to Docker Hub
                    sh 'docker push sejal28/prosepetals-backend'
                    // Push frontend Docker image to Docker Hub
                    sh 'docker push sejal28/prosepetals-frontend'
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                // Run Docker Compose to start services
                sh 'docker-compose -f docker-compose.yml up -d'
            }
        }
    }
    post {
        always {
            // Log out from Docker Hub
            sh 'docker logout'
        }
    }
}

